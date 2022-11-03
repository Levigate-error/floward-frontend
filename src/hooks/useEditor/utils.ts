import {
  FieldType, EditorParserObjectType, DataFieldType, FieldifyType, FieldSidedType, UseEditorReturnType,
} from './types';

const datalify = (parserObject: EditorParserObjectType): DataType => {
  const newData: DataType = {};

  Object.entries(parserObject).forEach(([key, value]) => {
    if (typeof value !== 'object') {
      if (typeof value === 'function') {
        newData[key] = value({}).defaultValue;
      } else {
        newData[key] = value;
      }
    } else {
      newData[key] = (value as DataFieldType).defaultValue;
    }
  });

  return newData;
};

const fieldify = ({
  parserObject,
  data,
  setData,
}: FieldifyType): FieldType[] => {
  let fields: FieldType[] | FieldSidedType = [];

  Object.entries(parserObject).forEach(([key, value]) => {
    const field: FieldType = {
      ...(typeof value === 'function' ? value(data) : value),
      slug: key,
      setValue: (v) => setData({ ...data, [key]: v }),
    };

    if ((value as DataFieldType).side) {
      if (!(fields as FieldSidedType).left || !(fields as FieldSidedType).right) {
        fields = {
          left: fields as FieldType[],
          right: [],
        };
      }
    }

    if (!!(fields as FieldSidedType).left && !!(fields as FieldSidedType).right) {
      (fields as FieldSidedType)[field.side || 'left'].push(field);
    } else {
      (fields as FieldType[]).push(field);
    }
  });

  return fields;
};

const mediafy = (parserObject: EditorParserObjectType): UseEditorReturnType['media'] => {
  let media: UseEditorReturnType['media'] = null;

  Object.entries(parserObject).forEach(([key, value]) => {
    if (typeof value === 'object' && (value as DataFieldType).type === 'media') {
      if (media === null) {
        media = {};
      }

      media[key] = {
        file: null,
        url: null,
        initUrl: null,
      };
    }
  });

  return media;
};

export { datalify, fieldify, mediafy };
