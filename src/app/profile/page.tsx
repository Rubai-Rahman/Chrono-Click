import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile - Chrono Click',
  description: 'Manage your account settings',
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Account Menu</h2>
            <nav className="space-y-2">
              <a href="#" className="block py-2 px-3 rounded hover:bg-muted">
                Personal Info
              </a>
              <a href="#" className="block py-2 px-3 rounded hover:bg-muted">
                Order History
              </a>
              <a href="#" className="block py-2 px-3 rounded hover:bg-muted">
                Addresses
              </a>
              <a href="#" className="block py-2 px-3 rounded hover:bg-muted">
                Payment Methods
              </a>
            </nav>
          </div>
        </div>

        {/* Profile content */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            {/* Profile form will go here */}
          </div>
        </div>
      </div>
    </div>
  );
}
