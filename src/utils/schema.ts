import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true, strict: false });

export function validateSchema(schema: any, data: unknown) {
  const validate = ajv.compile(schema);
  const ok = validate(data);
  if (!ok) {
    throw new Error("Schema validation failed: " + JSON.stringify(validate.errors, null, 2));
  }
}
