import React from 'react';
import { Plus, Minus } from 'lucide-react';
import type { DiscordEmbed, EmbedField } from '../App';

interface EmbedFormProps {
  embed: DiscordEmbed;
  setEmbed: (embed: DiscordEmbed) => void;
}

export default function EmbedForm({ embed, setEmbed }: EmbedFormProps) {
  const addField = () => {
    setEmbed({
      ...embed,
      fields: [
        ...(embed.fields || []),
        { name: '', value: '', inline: false }
      ]
    });
  };

  const removeField = (index: number) => {
    setEmbed({
      ...embed,
      fields: embed.fields?.filter((_, i) => i !== index)
    });
  };

  const updateField = (index: number, updates: Partial<EmbedField>) => {
    setEmbed({
      ...embed,
      fields: embed.fields?.map((field, i) =>
        i === index ? { ...field, ...updates } : field
      )
    });
  };

  return (
    <div className="bg-[#36393f] shadow-lg rounded-lg p-6 space-y-6">
      <h2 className="text-lg font-medium text-gray-100">Embed Content</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-200">Title</label>
          <input
            type="text"
            value={embed.title || ''}
            onChange={(e) => setEmbed({ ...embed, title: e.target.value })}
            className="mt-1 block w-full rounded-md bg-[#40444b] border-transparent text-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200">Description</label>
          <textarea
            value={embed.description || ''}
            onChange={(e) => setEmbed({ ...embed, description: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md bg-[#40444b] border-transparent text-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200">URL</label>
          <input
            type="url"
            value={embed.url || ''}
            onChange={(e) => setEmbed({ ...embed, url: e.target.value })}
            className="mt-1 block w-full rounded-md bg-[#40444b] border-transparent text-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200">Color</label>
          <input
            type="color"
            value={embed.color ? `#${embed.color.toString(16).padStart(6, '0')}` : '#000000'}
            onChange={(e) => setEmbed({ ...embed, color: parseInt(e.target.value.slice(1), 16) })}
            className="mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200">Timestamp</label>
          <input
            type="datetime-local"
            value={embed.timestamp ? new Date(embed.timestamp).toISOString().slice(0, 16) : ''}
            onChange={(e) => setEmbed({ ...embed, timestamp: e.target.value ? new Date(e.target.value).toISOString() : undefined })}
            className="mt-1 block w-full rounded-md bg-[#40444b] border-transparent text-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200">Image URL</label>
          <input
            type="url"
            value={embed.image?.url || ''}
            onChange={(e) => setEmbed({ ...embed, image: { url: e.target.value } })}
            className="mt-1 block w-full rounded-md bg-[#40444b] border-transparent text-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200">Thumbnail URL</label>
          <input
            type="url"
            value={embed.thumbnail?.url || ''}
            onChange={(e) => setEmbed({ ...embed, thumbnail: { url: e.target.value } })}
            className="mt-1 block w-full rounded-md bg-[#40444b] border-transparent text-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-200">Fields</label>
            <button
              type="button"
              onClick={addField}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-[#5865f2] hover:bg-[#4752c4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5865f2]"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Field
            </button>
          </div>

          {embed.fields?.map((field, index) => (
            <div key={index} className="space-y-2 p-4 border border-[#40444b] rounded-md bg-[#2f3136]">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-200">Field {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeField(index)}
                  className="text-[#ed4245] hover:text-[#c53337]"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
              
              <input
                type="text"
                value={field.name}
                onChange={(e) => updateField(index, { name: e.target.value })}
                placeholder="Field Name"
                className="block w-full rounded-md bg-[#40444b] border-transparent text-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              
              <textarea
                value={field.value}
                onChange={(e) => updateField(index, { value: e.target.value })}
                placeholder="Field Value"
                rows={2}
                className="block w-full rounded-md bg-[#40444b] border-transparent text-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={field.inline}
                  onChange={(e) => updateField(index, { inline: e.target.checked })}
                  className="h-4 w-4 text-[#5865f2] focus:ring-[#5865f2] bg-[#40444b] border-transparent rounded"
                />
                <label className="ml-2 text-sm text-gray-200">Inline</label>
              </div>
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200">Author Name</label>
          <input
            type="text"
            value={embed.author?.name || ''}
            onChange={(e) => setEmbed({ ...embed, author: { ...embed.author, name: e.target.value } })}
            className="mt-1 block w-full rounded-md bg-[#40444b] border-transparent text-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200">Author URL</label>
          <input
            type="url"
            value={embed.author?.url || ''}
            onChange={(e) => setEmbed({ ...embed, author: { ...embed.author, url: e.target.value } })}
            className="mt-1 block w-full rounded-md bg-[#40444b] border-transparent text-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200">Author Icon URL</label>
          <input
            type="url"
            value={embed.author?.icon_url || ''}
            onChange={(e) => setEmbed({ ...embed, author: { ...embed.author, icon_url: e.target.value } })}
            className="mt-1 block w-full rounded-md bg-[#40444b] border-transparent text-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200">Footer Text</label>
          <input
            type="text"
            value={embed.footer?.text || ''}
            onChange={(e) => setEmbed({ ...embed, footer: { ...embed.footer, text: e.target.value } })}
            className="mt-1 block w-full rounded-md bg-[#40444b] border-transparent text-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200">Footer Icon URL</label>
          <input
            type="url"
            value={embed.footer?.icon_url || ''}
            onChange={(e) => setEmbed({ ...embed, footer: { ...embed.footer, icon_url: e.target.value } })}
            className="mt-1 block w-full rounded-md bg-[#40444b] border-transparent text-gray-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}