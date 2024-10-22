import React, { useState } from 'react';
import { Send, Eye, Trash2 } from 'lucide-react';
import EmbedPreview from './components/EmbedPreview';
import EmbedForm from './components/EmbedForm';
import Toast from './components/Toast';

export interface DiscordEmbed {
  title?: string;
  description?: string;
  url?: string;
  color?: number;
  fields?: EmbedField[];
  author?: {
    name?: string;
    url?: string;
    icon_url?: string;
  };
  footer?: {
    text?: string;
    icon_url?: string;
  };
  timestamp?: string;
  image?: {
    url?: string;
  };
  thumbnail?: {
    url?: string;
  };
}

export interface EmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

function App() {
  const [webhook, setWebhook] = useState('');
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [embed, setEmbed] = useState<DiscordEmbed>({
    fields: []
  });
  const [toast, setToast] = useState<{ show: boolean; message: string; type: string }>({
    show: false,
    message: '',
    type: 'success'
  });

  const showToast = (message: string, type: string) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const sendEmbed = async () => {
    if (!webhook) {
      showToast('Please enter a webhook URL', 'error');
      return;
    }

    try {
      const response = await fetch(webhook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          avatar_url: avatarUrl,
          embeds: [embed],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send embed');
      }

      showToast('Embed sent successfully!', 'success');
    } catch (error) {
      showToast('Failed to send embed', 'error');
    }
  };

  const resetForm = () => {
    setWebhook('');
    setUsername('');
    setAvatarUrl('');
    setEmbed({ fields: [] });
  };

  return (
    <div className="min-h-screen bg-[#2f3136]">
      <nav className="bg-[#202225] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-100">Discord Webhook Creator</h1>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-[#36393f] shadow-lg rounded-lg p-6">
              <h2 className="text-lg font-medium mb-4 text-gray-100">Webhook Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200">
                    Webhook URL
                  </label>
                  <input
                    type="text"
                    value={webhook}
                    onChange={(e) => setWebhook(e.target.value)}
                    className="mt-1 block w-full rounded-md bg-[#40444b] border-transparent text-gray-200 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="https://discord.com/api/webhooks/..."
                  />
                  <p className="mt-1 text-sm text-gray-400">
                    Enter your Discord webhook URL from Discord channel settings
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200">
                    Bot Username (optional)
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 block w-full rounded-md bg-[#40444b] border-transparent text-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-200">
                    Bot Avatar URL (optional)
                  </label>
                  <input
                    type="text"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    className="mt-1 block w-full rounded-md bg-[#40444b] border-transparent text-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <EmbedForm embed={embed} setEmbed={setEmbed} />

            <div className="flex space-x-4">
              <button
                onClick={sendEmbed}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#5865f2] hover:bg-[#4752c4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5865f2] focus:ring-offset-[#2f3136]"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Embed
              </button>
              <button
                onClick={resetForm}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#ed4245] hover:bg-[#c53337] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ed4245] focus:ring-offset-[#2f3136]"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Reset Form
              </button>
            </div>
          </div>

          <div className="lg:sticky lg:top-8">
            <div className="bg-[#36393f] shadow-lg rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-100">Preview</h2>
                <Eye className="w-5 h-5 text-gray-400" />
              </div>
              <EmbedPreview embed={embed} username={username} avatarUrl={avatarUrl} />
            </div>
          </div>
        </div>
      </main>

      {toast.show && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}

export default App;