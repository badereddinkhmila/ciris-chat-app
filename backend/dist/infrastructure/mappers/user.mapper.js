"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_optional_1 = require("typescript-optional");
const user_model_1 = require("../../domain/user.model");
class ProductMapper {
    constructor(_prismaService) {
        this._prismaService = _prismaService;
    }
    static toDomain(user) {
        if (!user) {
            return typescript_optional_1.Optional.empty();
        }
        const mappedUser = new user_model_1.default(user.id, user.firstname, user.lastname, user.email, user.password);
        return typescript_optional_1.Optional.of(mappedUser);
    }
    static toDomains(users) {
        const usersMap = new Array();
        users.forEach((user) => {
            const mappedUser = this.toDomain(user);
            usersMap.push(mappedUser.get());
        });
        return usersMap;
    }
}
exports.default = ProductMapper;
//# sourceMappingURL=user.mapper.js.map