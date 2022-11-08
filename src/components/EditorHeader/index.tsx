import React, { FC } from 'react';
import PageHeader from 'components/PageHeader';
import Button from 'components/Button';
import { EditorHeaderProps } from './types';

const EditorHeader: FC<EditorHeaderProps> = ({
  title, goBackPath, goBackFunction, needsSave, onSave, additionalRightContent,
}) => (
  <PageHeader title={title} double>
    <PageHeader.Right>
      {goBackPath !== undefined && <Button href={goBackPath}>Back</Button>}
      {(goBackPath === undefined && goBackFunction !== undefined) && <Button onClick={goBackFunction}>Back</Button>}
      {(onSave !== undefined || needsSave !== undefined) && (
        <Button blinking={needsSave} disabled={!needsSave} onClick={onSave}>Save</Button>
      )}
      {additionalRightContent}
    </PageHeader.Right>
  </PageHeader>
);

export default EditorHeader;
