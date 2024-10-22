import React from 'react';
import type { DiscordEmbed } from '../App';

interface EmbedPreviewProps {
  embed: DiscordEmbed;
  username?: string;
  avatarUrl?: string;
}

export default function EmbedPreview({ embed, username, avatarUrl }: EmbedPreviewProps) {
  return (
    <div className="bg-[#36393f] text-white rounded-lg p-4 font-[Whitney,'Helvetica Neue',Helvetica,Arial,sans-serif]">
      {/* Webhook Info */}
      <div className="flex items-center mb-2">
        {avatarUrl && (
          <img src={avatarUrl} alt="" className="w-8 h-8 rounded-full mr-2" />
        )}
        {username && (
          <span className="font-semibold">{username}</span>
        )}
      </div>

      {/* Embed Container */}
      <div className="border-l-4 rounded" style={{ borderColor: `#${embed.color?.toString(16).padStart(6, '0')}` }}>
        <div className="pl-3">
          {/* Author */}
          {embed.author && (
            <div className="flex items-center mb-2">
              {embed.author.icon_url && (
                <img src={embed.author.icon_url} alt="" className="w-6 h-6 rounded-full mr-2" />
              )}
              {embed.author.name && (
                <a href={embed.author.url} className="text-white hover:underline font-semibold">
                  {embed.author.name}
                </a>
              )}
            </div>
          )}

          {/* Title */}
          {embed.title && (
            <div className="mb-2">
              <a href={embed.url} className="text-[#00b0f4] hover:underline font-semibold">
                {embed.title}
              </a>
            </div>
          )}

          {/* Description */}
          {embed.description && (
            <div className="mb-2 text-sm whitespace-pre-wrap">
              {embed.description}
            </div>
          )}

          {/* Fields */}
          {embed.fields && embed.fields.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-2">
              {embed.fields.map((field, index) => (
                <div key={index} className={field.inline ? 'col-span-1' : 'col-span-3'}>
                  <div className="font-semibold">{field.name}</div>
                  <div className="text-sm">{field.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Image */}
          {embed.image?.url && (
            <div className="mb-2">
              <img src={embed.image.url} alt="" className="max-w-full rounded" />
            </div>
          )}

          {/* Thumbnail */}
          {embed.thumbnail?.url && (
            <div className="float-right ml-4">
              <img src={embed.thumbnail.url} alt="" className="max-w-[80px] rounded" />
            </div>
          )}

          {/* Footer */}
          {(embed.footer?.text || embed.timestamp) && (
            <div className="flex items-center text-xs text-gray-400 mt-2">
              {embed.footer?.icon_url && (
                <img src={embed.footer.icon_url} alt="" className="w-5 h-5 rounded-full mr-2" />
              )}
              <span>{embed.footer?.text}</span>
              {embed.timestamp && (
                <>
                  {embed.footer?.text && <span className="mx-1">•</span>}
                  <span>{new Date(embed.timestamp).toLocaleString()}</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}