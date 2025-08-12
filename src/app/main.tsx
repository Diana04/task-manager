import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider, Layout } from 'antd';
import styled from 'styled-components';

import { TasksPage } from '@/pages/tasks';
import'./global.scss';

const StyledLayout = styled(Layout)`
  background: transparent;
  max-width: 650px;
  margin: 24px 0;
`;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledLayout>
      <TasksPage />
    </StyledLayout>
  </StrictMode>,
)
