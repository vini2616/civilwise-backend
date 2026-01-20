"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var companyController_1 = require("../controllers/companyController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1.default.Router();
router.route('/').get(authMiddleware_1.protect, companyController_1.getCompanies).post(authMiddleware_1.protect, companyController_1.createCompany);
router.route('/deleted').get(authMiddleware_1.protect, companyController_1.getDeletedCompanies);
router.route('/restore-trash/:id').post(authMiddleware_1.protect, companyController_1.restoreCompanyFromTrash);
router.route('/:id').delete(authMiddleware_1.protect, companyController_1.deleteCompany).put(authMiddleware_1.protect, companyController_1.updateCompany);
router.route('/restore').post(authMiddleware_1.protect, companyController_1.restoreCompany);
exports.default = router;
