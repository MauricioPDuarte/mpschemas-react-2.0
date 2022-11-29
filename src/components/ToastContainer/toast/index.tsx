import React, { useEffect } from 'react';
import { FiAlertCircle, FiX, FiCheckCircle, FiInfo } from 'react-icons/fi';

import { IToastMessage, useToast } from '../../../hooks/toast';

import { Container } from './styles';

interface IToastProps {
  message: IToastMessage;
  style: Object;
}

const icons = {
  info: <FiInfo size={20} />,
  error: <FiAlertCircle size={20} />,
  success: <FiCheckCircle size={20} />,
};

const Toast: React.FC<IToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Container type={message.type} style={style}>
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(message.id)}>
        <FiX size={20} />
      </button>
    </Container>
  );
};

export default Toast;