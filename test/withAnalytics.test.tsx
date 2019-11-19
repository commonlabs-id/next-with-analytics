/* eslint-disable import/no-extraneous-dependencies */

import * as React from 'react';
import { render, cleanup } from '@testing-library/react';

import Router from 'next/router';
import { withAnalytics } from '../src/index';

import '@testing-library/jest-dom/extend-expect';

jest.mock('next/router', () => ({
  events: {
    on: jest.fn(f => f),
    off: jest.fn(f => f),
  },
}));
jest.mock('react-ga');

afterEach(cleanup);

describe('withAnalytics', () => {
  test('renders correctly', () => {
    const TestApp: any = () => <div>h</div>;
    const WithAnalytics: any = withAnalytics(Router)(TestApp);
    const { container } = render(<WithAnalytics />);

    expect(container).toBeInTheDocument();
  });
});
