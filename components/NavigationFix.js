import { useRouter } from 'next/router';
import Link from 'next/link';

export function NavigationWithFix({ userProfile }) {
  const router = useRouter();
  
  // BEFORE (potentially problematic):
  // const handleProfileClick = () => {
  //   router.push(userProfile?.dashboardUrl); // Could be undefined!
  // };
  
  // AFTER (with fix):
  const handleProfileClick = () => {
    // Add a safety check to ensure the path is a valid string
    const dashboardUrl = userProfile?.dashboardUrl || '/default-dashboard';
    router.push(dashboardUrl);
  };

  return (
    <nav>
      {/* BEFORE (potentially problematic): */}
      {/* <Link href={userProfile?.settingsUrl}>Settings</Link> */}
      
      {/* AFTER (with fix): */}
      <Link href={userProfile?.settingsUrl || '/settings'}>Settings</Link>
      
      <button onClick={handleProfileClick}>Dashboard</button>
    </nav>
  );
}

export default NavigationWithFix;
