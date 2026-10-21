import React, { useEffect, useRef, useState } from 'react';
import {
  LogIn,
  PlusCircle,
  Send,
  Shield,
  Trash2,
  Users,
  MessageSquare,
  Sparkles,
  Crown,
  Gamepad2,
  Flame,
  Radio,
} from 'lucide-react';
import { useGame } from '../context/GameContext.js';
import { PlayerAvatarBadge } from './PlayerAvatarBadge.js';

interface GlobalChatHomeProps {
  onOpenJoinModal: () => void;
  onOpenCreateModal: () => void;
  onOpenHostDashboard: () => void;
}

export function GlobalChatHome({
  onOpenJoinModal,
  onOpenCreateModal,
  onOpenHostDashboard,
}: GlobalChatHomeProps) {
  const { user, globalChat, sendGlobalChat, deleteGlobalChat, clearGlobalChat, openUserProfile } = useGame();
  const [inputText, setInputText] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [globalChat]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendGlobalChat(inputText);
    setInputText('');
  };

  const handleExecuteClearChat = async () => {
    setIsClearing(true);
    await clearGlobalChat();
    setIsClearing(false);
    setShowClearConfirm(false);
  };

  const formatTime = (ts: number) => {
    const date = new Date(ts);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isHost =
    user?.email?.toLowerCase() === 'obyda.cmch@gmail.com' ||
    user?.role === 'HOST' ||
    (user?.role as string) === 'ADMIN' ||
    user?.username.toLowerCase() === 'admin' ||
    user?.username.toLowerCase() === 'nafiul';

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-8 flex flex-col gap-4 sm:gap-6 min-h-[calc(100vh-4.5rem)]">
      {/* Cartoon Party Game Hero / Lobby Banner */}
      <div className="text-center flex flex-col items-center animate-pop-in">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/80 dark:bg-[#10172e]/85 backdrop-blur-md border border-indigo-200 dark:border-indigo-700/60 rounded-full text-xs font-game font-bold text-indigo-600 dark:text-indigo-300 mb-2 shadow-xs">
          <Gamepad2 className="w-3.5 h-3.5 text-rose-500 dark:text-cyan-400" />
          <span>Party Game Lobby</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-game tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-amber-400 to-cyan-400 drop-shadow-xs">
          SPY GAME
        </h1>
        <p className="mt-1 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 max-w-md drop-shadow-xs px-2">
          Join a party room, blend in with your crew, and sniff out the secret spy!
        </p>

        {/* 3D Tactile Action Buttons */}
        <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full max-w-xl">
          <button
            onClick={onOpenJoinModal}
            className="flex-1 min-w-[130px] sm:min-w-[160px] py-3 sm:py-3.5 px-4 sm:px-6 btn-game-coral font-game font-black text-xs sm:text-sm tracking-wider rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogIn className="w-4 h-4 stroke-[2.5]" />
            <span>JOIN ROOM</span>
          </button>

          <button
            onClick={onOpenCreateModal}
            className="flex-1 min-w-[130px] sm:min-w-[160px] py-3 sm:py-3.5 px-4 sm:px-6 btn-game-amber font-game font-black text-xs sm:text-sm tracking-wider rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 stroke-[2.5]" />
            <span>CREATE ROOM</span>
          </button>

          {isHost && (
            <button
              onClick={onOpenHostDashboard}
              className="w-full sm:w-auto py-2.5 sm:py-3 px-4 sm:px-5 btn-game-purple font-game font-black text-xs tracking-wider rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5 fill-current" />
              <span>HOST & ADMIN PANEL</span>
            </button>
          )}
        </div>
      </div>

      {/* Live Global Chat Box */}
      <div className="flex-1 w-full max-w-full flex flex-col bg-white dark:bg-[#10152B] border-2 border-indigo-100 dark:border-indigo-950/80 rounded-3xl overflow-hidden shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.65)] transition-colors duration-300">
        {/* Chat Header */}
        <div className="px-3.5 sm:px-5 py-3 sm:py-3.5 bg-slate-50/90 dark:bg-[#0e1428]/90 backdrop-blur-md border-b border-indigo-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-500 dark:text-rose-400 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <span className="font-game font-black text-xs sm:text-sm tracking-wide uppercase text-slate-800 dark:text-white">
              LOBBY CHAT
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 text-[11px] font-game font-bold text-slate-500 dark:text-slate-400">
              <span className="hidden xs:inline">All Players</span>
              <span className="text-emerald-500 dark:text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                LIVE
              </span>
            </div>

            {/* Host Clear Chat Button */}
            {isHost &&
              (showClearConfirm ? (
                <div className="flex items-center gap-1.5 bg-rose-100 dark:bg-rose-950/80 px-2 py-1 rounded-xl border border-rose-300 dark:border-rose-800">
                  <span className="text-[10px] sm:text-[11px] font-bold text-rose-800 dark:text-rose-200">
                    Wipe?
                  </span>
                  <button
                    type="button"
                    onClick={handleExecuteClearChat}
                    disabled={isClearing}
                    className="px-2 py-0.5 text-[10px] sm:text-[11px] font-game font-bold bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition-colors cursor-pointer"
                  >
                    {isClearing ? '...' : 'YES'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowClearConfirm(false)}
                    className="px-1.5 py-0.5 text-[10px] sm:text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowClearConfirm(true)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-game font-bold rounded-xl bg-rose-100 hover:bg-rose-200 dark:bg-rose-950/70 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800/80 transition-all cursor-pointer shadow-xs active:scale-95"
                  title="Clear all chat history for everyone now"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                  <span className="hidden sm:inline">CLEAR CHAT</span>
                </button>
              ))}
          </div>
        </div>

        {/* Message List */}
        <div className="flex-1 w-full overflow-y-auto p-3 sm:p-5 space-y-3 sm:space-y-4 max-h-[500px] min-h-[320px]">
          {globalChat.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 py-12">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-[#10152B] flex items-center justify-center text-indigo-400 mb-2">
                <MessageSquare className="w-6 h-6 opacity-60" />
              </div>
              <p className="text-xs font-game font-bold text-slate-700 dark:text-slate-300">Lobby chat is quiet.</p>
              <p className="text-[11px] text-slate-400">Send a greeting to all players to kick things off!</p>
            </div>
          ) : (
            globalChat.map((msg) => {
              const isMe = msg.senderId === user?.id;
              const isSenderHost = msg.senderUsername.toLowerCase() === 'nafiul';

              return (
                <div
                  key={msg.id}
                  className={`group flex items-end gap-2 ${
                    isMe ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {/* Avatar Bubble - Click to view profile */}
                  <button
                    type="button"
                    onClick={() => openUserProfile(msg.senderUsername)}
                    className="focus:outline-none cursor-pointer transform hover:scale-110 active:scale-95 transition-transform"
                    title={`View @${msg.senderUsername}'s profile`}
                  >
                    <PlayerAvatarBadge
                      username={msg.senderUsername}
                      avatarId={msg.senderAvatar}
                      size="sm"
                      className="mb-0.5"
                    />
                  </button>

                  <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[85%] sm:max-w-[70%]`}>
                    {/* Header */}
                    <div className="flex items-center gap-1.5 mb-1 px-1 text-xs">
                      <button
                        type="button"
                        onClick={() => openUserProfile(msg.senderUsername)}
                        className={`font-game font-bold hover:underline cursor-pointer text-left ${
                          isSenderHost
                            ? 'text-amber-600 dark:text-amber-400 flex items-center gap-1'
                            : isMe
                            ? 'text-rose-500 dark:text-rose-400'
                            : 'text-slate-700 dark:text-slate-300'
                        }`}
                        title={`View @${msg.senderUsername}'s profile`}
                      >
                        {isSenderHost && <Crown className="w-3 h-3 fill-current inline" />}
                        {msg.senderUsername}
                        {isSenderHost && ' (Host)'}
                      </button>
                      <span className="text-[10px] text-slate-400 tabular-nums font-mono">
                        {formatTime(msg.timestamp)}
                      </span>
                      {isHost && (
                        <button
                          onClick={() => deleteGlobalChat(msg.id)}
                          className="p-1 text-slate-400 hover:text-rose-500 dark:text-slate-500 dark:hover:text-rose-400 rounded hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                          title="Delete this message (Host only)"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {/* Speech Bubble */}
                    <div
                      className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl sm:rounded-3xl text-sm leading-relaxed shadow-xs ${
                        isMe
                          ? 'bg-rose-500 text-white rounded-br-xs'
                          : isSenderHost
                          ? 'bg-amber-100 dark:bg-amber-950/70 border border-amber-300 dark:border-amber-700/80 text-amber-950 dark:text-amber-100 rounded-bl-xs'
                          : 'bg-slate-100 dark:bg-[#161C33] border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-xs'
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Chat Input Form */}
        <form
          onSubmit={handleSendMessage}
          className="p-2.5 sm:p-4 bg-slate-50/90 dark:bg-[#0a0f20]/90 backdrop-blur-md border-t border-indigo-100 dark:border-slate-800/90 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message to everyone in the lobby..."
            className="flex-1 min-w-0 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-[#121932] border border-slate-200 dark:border-slate-700 rounded-2xl text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors shadow-inner"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="py-2 sm:py-2.5 px-3 sm:px-4 btn-game-coral font-game font-black text-xs tracking-wider rounded-2xl flex items-center gap-1.5 cursor-pointer shrink-0 disabled:opacity-40"
          >
            <Send className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden sm:inline">SEND</span>
          </button>
        </form>
      </div>
    </div>
  );
}
