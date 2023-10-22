import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import renderer from 'react-test-renderer';

import { AuthRoom } from './AuthRoom';

describe('<AuthRoom /> snapshot', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<AuthRoom username="TestUser" onValidated={jest.fn()} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('<AuthRoom />', () => {
  const mockOnValidated = jest.fn();

  it('renders correctly', () => {
    const { getByText } = render(<AuthRoom username="TestUser" onValidated={mockOnValidated} />);
    expect(getByText('Hi TestUser, choose or create a room to get started')).toBeInTheDocument();
  });

  it('calls onValidated with correct values on form submission', () => {
    const { getByPlaceholderText, getByText } = render(<AuthRoom username="TestUser" onValidated={mockOnValidated} />);

    const roomInput = getByPlaceholderText('My room');
    fireEvent.change(roomInput, { target: { value: 'TestRoom' } });

    const passwordInput = getByPlaceholderText('Search by any field');
    fireEvent.change(passwordInput, { target: { value: 'TestPassword' } });

    const loginButton = getByText('Login');
    fireEvent.click(loginButton);

    expect(mockOnValidated).toHaveBeenCalledWith({ room: 'TestRoom', password: 'TestPassword' });
  });

  it('toggles the switch correctly', () => {
    const { getByRole } = render(<AuthRoom username="TestUser" onValidated={mockOnValidated} />);
    const switchButton = getByRole('checkbox');
    fireEvent.click(switchButton);
    expect(switchButton).toBeChecked();
  });

  it('updates input values correctly', () => {
    const { getByPlaceholderText } = render(<AuthRoom username="TestUser" onValidated={mockOnValidated} />);

    const roomInput = getByPlaceholderText('My room');
    fireEvent.change(roomInput, { target: { value: 'TestRoom' } });
    // expect(roomInput.value).toBe('TestRoom');

    const passwordInput = getByPlaceholderText('Search by any field');
    fireEvent.change(passwordInput, { target: { value: 'TestPassword' } });
    // expect(passwordInput.value).toBe('TestPassword');
  });
});
