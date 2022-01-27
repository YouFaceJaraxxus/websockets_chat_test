import React, { useEffect } from 'react';
import { KnowledgeBitesHolder } from '../ui/knowledgeListStyle';
import KnowledgeFile from './knowledgeFile';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getKnowledgesAsync } from '../models/knowledge/knowledgesSlice';
import { TableSpinner, TableSpinnerWrapper } from '../../Dashboard/ui/TableDataStyle';

const KnowledgeList = () => {
  const dispatch = useAppDispatch();
  const knowledges = useAppSelector((state) => state.knowledges);
  useEffect(() => {
    dispatch(getKnowledgesAsync({}));
  }, []);
  return (
    <KnowledgeBitesHolder>
      {
        knowledges.fetching ?
          (
            <TableSpinnerWrapper>
              <TableSpinner color="primary" />
            </TableSpinnerWrapper>
          )
          : (
            <>
              {knowledges.knowledges.map((knowledge) => (
                <KnowledgeFile knowledge={knowledge} key={knowledge.id} />
              ))}
            </>
          )
      }
    </KnowledgeBitesHolder>
  );
};

export default KnowledgeList;
