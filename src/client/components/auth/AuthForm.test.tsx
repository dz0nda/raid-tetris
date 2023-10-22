import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
// import '@testing-library/jest-dom/extend-expect';
import { AuthForm } from './AuthForm';

it('matches snapshot', () => {
  const tree = renderer.create(<AuthForm onValidated={jest.fn()} />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('<AuthForm />', () => {
  const mockOnValidated = jest.fn();

  beforeEach(() => {
    render(<AuthForm onValidated={mockOnValidated} />);
  });

  it('renders correctly', () => {
    const input = screen.getByPlaceholderText('Your username');
    const loginButton = screen.getByText('Login');
    const beaconButton = screen.getByText('Beacon');

    expect(input).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(beaconButton).toBeInTheDocument();
  });

  it('shows validation error for short username', () => {
    const input = screen.getByPlaceholderText('Your username');
    const loginButton = screen.getByText('Login');

    fireEvent.change(input, { target: { value: 'short' } });
    fireEvent.click(loginButton);

    expect(screen.getByText('Username should include at least 6 characters')).toBeInTheDocument();
  });

  it('calls onValidated with correct values on form submission', () => {
    const input = screen.getByPlaceholderText('Your username');
    const loginButton = screen.getByText('Login');

    fireEvent.change(input, { target: { value: 'validUsername' } });
    fireEvent.click(loginButton);

    expect(mockOnValidated).toHaveBeenCalledWith({ username: 'validUsername' });
  });
});
