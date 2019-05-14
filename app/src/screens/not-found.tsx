import React from 'react';

import { ErrorMessage } from '../components/messages/error-message';

export const NotFound: React.FC = () => (
  <ErrorMessage extraMessage='That page cannot be found.' />
);
