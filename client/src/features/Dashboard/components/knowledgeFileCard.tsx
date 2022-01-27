import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import SingleItemStyle from '../ui/SingleItemStyle';
import knowBookIcon from '../../../assets/icons/knowBook.svg';
import { getAssetPresignedUrl } from '../models/assets/AssetsService';

const KnowledgeFile = ({ knowledge }) => {
  const [link, setLink] = useState(null);
  const getLink = () => {
    if (knowledge.link != null) {
      setLink(knowledge.link);
    } else if (knowledge.assetId) {
      getAssetPresignedUrl(knowledge.assetId).then((response) => {
        setLink(response.preSignedUrl);
      });
    }
  };
  useEffect(() => {
    getLink();
  }, []);
  return (
    <SingleItemStyle myColor="white">
      <Box
        component="div"
        sx={{
          width: '100%',
          margin: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Avatar
          alt="Knowbook"
          src={knowBookIcon}
          sx={{ width: 25, height: 25, margin: '0px auto' }}
        />
        <a
          href={link}
          target="_blank"
          style={{
            fontSize: '16px',
            display: 'block',
            marginLeft: '20px',
            width: '100%',
            color: 'black',
            textDecoration: 'none',
          }}
          rel="noreferrer"
        >
          {knowledge.name}
        </a>
      </Box>
    </SingleItemStyle>
  );
};

export default KnowledgeFile;
