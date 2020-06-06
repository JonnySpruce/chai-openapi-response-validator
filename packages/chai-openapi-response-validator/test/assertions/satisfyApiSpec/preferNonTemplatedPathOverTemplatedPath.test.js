const chai = require('chai');
const path = require('path');

const chaiResponseValidator = require('../../..');

const openApiSpecsDir = path.resolve('../../commonTestResources/exampleOpenApiFiles/valid/preferNonTemplatedPathOverTemplatedPath');
const { expect } = chai;

describe('expect(res).to.satisfyApiSpec (using an OpenAPI spec with similar templated and non-templated OpenAPI paths)', function () {
  [
    2,
    3,
  ].forEach((openApiVersion) => {
    describe(`OpenAPI ${openApiVersion}`, function () {
      const openApiSpecs = [
        {
          isNonTemplatedPathFirst: true,
          pathToApiSpec: path.join(openApiSpecsDir, 'nonTemplatedPathBeforeTemplatedPath', `openapi${openApiVersion}.yml`),
        },
        {
          isNonTemplatedPathFirst: false,
          pathToApiSpec: path.join(openApiSpecsDir, 'nonTemplatedPathAfterTemplatedPath', `openapi${openApiVersion}.yml`),
        },
      ];

      openApiSpecs.forEach((spec) => {
        const {
          pathToApiSpec,
          isNonTemplatedPathFirst,
        } = spec;

        describe(`res.req.path matches a non-templated OpenAPI path ${isNonTemplatedPathFirst ? 'before' : 'after'} a templated OpenAPI path`, function () {
          const res = {
            status: 200,
            req: {
              method: 'GET',
              path: '/test/preferNonTemplatedPathOverTemplatedPath/nonTemplatedPath',
            },
            body: 'valid body (string)',
          };

          before(function () {
            chai.use(chaiResponseValidator(pathToApiSpec));
          });

          it('passes', function () {
            expect(res).to.satisfyApiSpec;
          });

          it('fails when using .not', function () {
            const assertion = () => expect(res).to.not.satisfyApiSpec;
            expect(assertion).to.throw('not to satisfy the \'200\' response defined for endpoint \'GET /test/preferNonTemplatedPathOverTemplatedPath/nonTemplatedPath\'');
          });
        });
      });
    });
  });
});
