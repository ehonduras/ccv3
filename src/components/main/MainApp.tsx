import React from 'react';

interface MainAppProps{
    children: React.ReactNode;
}

const MainApp: React.FC<MainAppProps> = ({children}) => {
  return (
    <div>{children}</div>
  )
}

export default MainApp