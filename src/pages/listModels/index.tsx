import { Header } from '../../components/Header/Header';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Button } from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { Divider } from '../../components/Divider/Divider';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ModelsList } from './components/ModelsList';


export function Models() {

    return (
      <>
       <ModelsList />
      </>
    )
  }
  
  