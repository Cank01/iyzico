"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _nanoid = _interopRequireDefault(require("../utils/nanoid"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  Schema
} = _mongoose.default;
const PaymentFailedSchema = new Schema({
  uid: {
    type: String,
    default: (0, _nanoid.default)(),
    unique: true,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ["failure"]
  },
  conversationId: {
    type: String,
    required: true
  },
  errorCode: {
    type: String,
    required: true
  },
  errorMessage: {
    type: String,
    required: true
  },
  log: {
    type: Schema.Types.Mixed,
    required: true
  }
}, {
  _id: true,
  collection: "payment-failed",
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      delete ret.password;
      return {
        ...ret
      };
    }
  }
});
const PaymentFailed = _mongoose.default.model("PaymentFailed", PaymentFailedSchema);
var _default = exports.default = PaymentFailed;