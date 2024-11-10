import { Slot } from 'expo-router';

export type AuthStackParamList = {
  'sign-in': undefined;
  'sign-up': undefined;
};

export default function AuthLayout() {
  return <Slot />;
}