import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { App } from './App';

// Mock functions
const mockRender = jest.fn();

// Mock the ReactDOM.createRoot function
jest.mock('react-dom/client', () => {
  return {
    createRoot: jest.fn().mockImplementation(() => ({
      render: mockRender,
    })),
  };
});

// Mock the getElementById function
const mockElement = {} as HTMLElement;
document.getElementById = jest.fn().mockReturnValue(mockElement);

describe('index', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // This ensures a fresh mock state for each test
  });

  test('renders without crashing', () => {
    require('./index');

    expect(document.getElementById).toHaveBeenCalledWith('tetris');
    expect(ReactDOM.createRoot).toHaveBeenCalledWith(mockElement);
    expect(mockRender).toHaveBeenCalledWith(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>,
    );
  });
});
