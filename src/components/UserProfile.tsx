
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, History, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  created_at: string;
}

const UserProfile = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [analysisCount, setAnalysisCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchAnalysisCount();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchAnalysisCount = async () => {
    try {
      const { count, error } = await supabase
        .from('plant_analyses')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user?.id);

      if (error) throw error;
      setAnalysisCount(count || 0);
    } catch (error) {
      console.error('Error fetching analysis count:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) throw error;
      
      toast({
        title: 'Signed out successfully',
        description: 'You have been logged out.',
      });
    } catch (error) {
      toast({
        title: 'Sign out failed',
        description: 'An error occurred while signing out.',
        variant: 'destructive',
      });
    }
  };

  if (!profile) return null;

  const initials = profile.full_name
    ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase()
    : profile.email[0].toUpperCase();

  return (
    <Card className="border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="w-5 h-5 text-green-600" />
          <span>Profile</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-green-100 text-green-700">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-green-800">{profile.full_name}</h3>
            <p className="text-sm text-green-600">{profile.email}</p>
          </div>
        </div>
        
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <History className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700">Plant Analyses</span>
            </div>
            <span className="font-semibold text-green-800">{analysisCount}</span>
          </div>
        </div>

        <Button 
          variant="outline" 
          onClick={handleSignOut}
          className="w-full border-red-200 text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
