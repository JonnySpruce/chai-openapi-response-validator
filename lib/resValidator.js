/*******************************************************************************
 * Copyright 2019 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *******************************************************************************/

const util = require('util');
const fs = require('fs-extra');
const yaml = require('js-yaml');
const FilePath = require('path');
const url = require('url');
const PathParser = require('path-parser').default;
const OpenAPISchemaValidator = require('openapi-schema-validator').default;
const OpenAPIResponseValidator = require('openapi-response-validator').default;

// In this file, 'OA' means 'Open API'

module.exports = function(pathToOpenApiSpec) {
  const openApiSpec = parseOpenApiFile(pathToOpenApiSpec);

  return function (chai) {
    const Assertion = chai.Assertion;

    Assertion.addProperty('satisfyApiSpec', function () {
      const res = this._obj;
      const expectedResponse = findResExpectedByApiSpec(res, openApiSpec);

      const validationError = validateResAgainstApiSpec(res, expectedResponse, openApiSpec);

      const responseSummary = util.inspect({ status: res.status, body: res.body });
      this.assert(
        !validationError,
        `expected res to satisfy API spec:\n${util.inspect(validationError)}`,
        `expected res not to satisfy API spec for '${res.status}' response defined for endpoint '${res.req.method} ${getOAPath(res.req, openApiSpec)}' in OpenAPI spec\nres: ${responseSummary}`,
      );
    });
  };
};

function parseOpenApiFile(filePath) {
  if (!FilePath.isAbsolute(filePath)) {
    throw new Error('The "path" argument must be an absolute filepath');
  }
  const fileData = fs.readFileSync(filePath);
  let openApiSpec;
  try {
    openApiSpec = yaml.safeLoad(fileData);
  } catch (error) {
    throw new Error(`Unable to read the specified OpenAPI document. File is invalid YAML or JSON:\n${error.message}`);
  }

  try {
    const openApiVersion = openApiSpec.swagger || openApiSpec.openapi;
    const validator = new OpenAPISchemaValidator({ version: openApiVersion });
    const { errors } = validator.validate(openApiSpec);
    if (errors.length > 0) throw new Error(util.inspect(errors));
  } catch (error) {
    throw new Error(`File is not a valid OpenAPI spec.\nError(s): ${error.message}`);
  }

  return openApiSpec;
}

function findResExpectedByApiSpec(res, openApiSpec) {
  const openApiPath = getOAPath(res.req, openApiSpec);

  const pathObj = openApiSpec.paths[openApiPath];
  if (!pathObj) {
    throw new Error(`No '${openApiPath}' path defined in OpenAPI spec`);
  }

  const httpMethod = res.req.method;
  const endpointObj = pathObj[httpMethod.toLowerCase()];
  if (!endpointObj) {
    throw new Error(`No '${res.req.method}' method defined for path '${openApiPath}' in OpenAPI spec`);
  }

  const { status } = res;
  const expectedResponse = endpointObj.responses[status];
  if (!expectedResponse) {
    throw new Error(`No '${status}' response defined for endpoint '${httpMethod} ${openApiPath}' in OpenAPI spec`);
  }

  return { [status]: expectedResponse };
}

function validateResAgainstApiSpec(res, expectedResponse, openApiSpec) {
  const resValidator = new OpenAPIResponseValidator({
    responses: expectedResponse,
    components: openApiSpec.components, // needed if openApiSpec is OpenAPI 3
    definitions: openApiSpec.definitions, // needed if openApiSpec is OpenAPI 2
  });

  const [expectedResStatus] = Object.keys(expectedResponse);
  const validationError = resValidator.validateResponse(expectedResStatus, res.body);
  if (validationError) {
    validationError.actualResponse = { status: res.status, body: res.body };
  }
  return validationError;
}


function getOAPath(req, openApiSpec) {
  const pathname = url.parse(req.path).pathname; // excludes the query (because: path = pathname + query)
  if (openApiSpec.paths.hasOwnProperty(pathname)) {
    return pathname;
  }
  const OAPaths = Object.keys(openApiSpec.paths);
  const OAPath = findOAPathMatchingPathname(pathname, OAPaths);
  return OAPath || pathname;
}

function findOAPathMatchingPathname(pathname, OAPaths) {
  const OAPathsWithPathParams = OAPaths.filter(path => path.includes('{'));
  const OAPath = OAPathsWithPathParams.find(OAPath => {
    const pathInColonForm = OAPath.replace(/{/g, ':').replace(/}/g, ''); // converts all {foo} to :foo
    const pathParser = new PathParser(pathInColonForm);
    const pathParamsInPathname = pathParser.test(pathname);
    return !!pathParamsInPathname;
  });
  return OAPath;
}
