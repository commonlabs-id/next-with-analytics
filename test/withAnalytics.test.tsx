/* eslint-disable import/no-extraneous-dependencies */

import * as React from 'react';
import { NextPage } from 'next';
import { render, cleanup } from '@testing-library/react';

import Router from 'next/router';
import { withAnalytics } from '../src/index';

import 'jest-dom/extend-expect';

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
    const TestPage: NextPage = () => <div>Example page</div>;
    const WithAnalytics = withAnalytics(Router)(TestPage);
    const { container } = render(<WithAnalytics />);

    expect(container).toBeInTheDocument();
  });
});
