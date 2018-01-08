import {JsonSchema} from "../../../../src/jsonschema/class/JsonSchema";
import {Enum} from "../../../../src/jsonschema/decorators/enum";
import {stubSchemaDecorator} from "./utils";

describe("Enum", () => {
    before(() => {
        this.decorateStub = stubSchemaDecorator();
        this.schema = new JsonSchema();
        Enum("0", "1");
        this.decorateStub.getCall(0).args[0](this.schema);
    });
    after(() => {
        this.decorateStub.restore();
    });

    it("should store data", () => {
        this.schema.enum.should.deep.eq(["0", "1"]);
    });
});