import React from 'react';
import Button from 'antd/lib/button';
import {useWindowWidth} from "../utils";
import '../styles/not-found.css';

const NotFound = () => {
  const width = useWindowWidth();
  return (
    <div className="container-not-found">
      <div>
        <img
          style={{
            width: width > 800 ? 'auto' : '18.75rem'
          }}
          src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif"
          alt="404"
        />
      </div>
      <span className="msg-not-found">
        It’s not you, it’s me
      </span>
      <Button className="fallback-btn">
        <a href="/conversations">Revenir à l'accueil</a>
      </Button>
    </div>
  );
};

export default NotFound;
