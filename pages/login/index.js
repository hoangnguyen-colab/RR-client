import React, { useState } from "react";
import LoginForm from "@components/LoginForm";
import withoutAuth from '@hocs/withoutAuth';
import { LoginWrapper } from '@components/styled/login.style';

function index() {
  return (
      <div className='main-container'>
        <LoginForm />
      </div>
  );
}

export default withoutAuth(index);
