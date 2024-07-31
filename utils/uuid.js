import shortUUID from "short-uuid";
import { customAlphabet } from 'nanoid';

const generateTraceId = () => {
  return shortUUID.generate();
};

const generateFixedDigitId = (length) => {
  const customNanoid = customAlphabet('0123456789', length);
  return customNanoid();
};

const uuidUtil = { generateTraceId, generateFixedDigitId };
export default uuidUtil;
