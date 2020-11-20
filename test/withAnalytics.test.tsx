/* eslint-disable import/no-extraneous-dependencies */

import * as React from 'react';
import { render, cleanup } from '@testing-library/react';

import { AnalyticsScript } from '../src/index';

import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

describe('withAnalytics', () => {
  test('renders correctly', () => {
    const { container } = render(<AnalyticsScript />);
    expect(container).toBeInTheDocument();
  });
});
