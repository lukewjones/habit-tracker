import { useState } from 'react';
import { router } from 'expo-router';
import { supabase } from '../supabase';
import AccountModal from '../components/AccountModal';
import { Session } from '@supabase/supabase-js';

export default function ModalScreen() {
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [session, setSession] = useState<Session | null>(null);

  const handleUpdateProfile = async (params: { username: string; website: string; avatar_url: string }) => {
    setLoading(true);
    // Add your profile update logic here
    setLoading(false);
  };

  return (
    <AccountModal
      visible={true}
      onClose={() => router.back()}
      session={session}
      loading={loading}
      avatarUrl={avatarUrl}
      setAvatarUrl={setAvatarUrl}
      onUpdateProfile={handleUpdateProfile}
    />
  );
}
