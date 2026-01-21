import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";
import { API_ENDPOINTS } from "@/config/api";

interface Message {
  id: number;
  userId: string;
  username: string;
  text: string;
  isCreator: boolean;
  timestamp: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId] = useState(() => {
    let id = localStorage.getItem('chatUserId');
    if (!id) {
      id = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('chatUserId', id);
    }
    return id;
  });
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('chatUsername') || 'Гость';
  });
  const [showNameInput, setShowNameInput] = useState(() => {
    return !localStorage.getItem('chatUsername');
  });
  const [tempUsername, setTempUsername] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const previousMessageCountRef = useRef(0);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.chat);
      const data = await response.json();
      
      if (data.messages) {
        const newMessagesCount = data.messages.length;
        
        if (newMessagesCount > previousMessageCountRef.current && previousMessageCountRef.current > 0) {
          setHasNewMessage(true);
          setTimeout(() => setHasNewMessage(false), 3000);
        }
        
        previousMessageCountRef.current = newMessagesCount;
        
        setMessages(data.messages.map((msg: any) => ({
          id: msg.id,
          userId: msg.userId,
          username: msg.username,
          text: msg.text,
          isCreator: msg.isCreator,
          timestamp: msg.timestamp
        })));
        
        scrollToBottom();
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSetUsername = () => {
    if (tempUsername.trim()) {
      const name = tempUsername.trim();
      setUsername(name);
      localStorage.setItem('chatUsername', name);
      setShowNameInput(false);
      toast({
        title: "Имя установлено",
        description: `Теперь вы общаетесь как ${name}`,
      });
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    try {
      const response = await fetch(API_ENDPOINTS.chat, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          username: username,
          messageText: inputValue.trim(),
          isCreator: false
        })
      });

      if (response.ok) {
        setInputValue("");
        await fetchMessages();
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось отправить сообщение",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Ошибка сети",
        description: "Проверьте подключение к интернету",
        variant: "destructive"
      });
    }
  };

  const isMyMessage = (msg: Message) => msg.userId === userId;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50 to-pink-50 flex flex-col">
      <nav className="glass border-b border-white/20 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/">
            <h1 className="text-2xl font-heading font-bold gradient-text hover-scale cursor-pointer">
              ChatSpace
            </h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" className="hover-scale">
                <Icon name="Home" size={20} className="mr-2" />
                Главная
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost" className="hover-scale">
                <Icon name="User" size={20} className="mr-2" />
                О создателе
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex-1 container mx-auto px-6 py-8 max-w-4xl">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl h-[calc(100vh-180px)] flex flex-col overflow-hidden animate-scale-in">
          <div className="bg-gradient-to-r from-primary to-secondary p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12 border-2 border-white">
                <AvatarFallback className="bg-white text-primary font-bold">💬</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-heading font-bold text-white">Общий чат</h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse-glow"></div>
                  <span className="text-sm text-white/90">{username}</span>
                </div>
              </div>
            </div>
            {hasNewMessage && (
              <Badge className="bg-white text-primary animate-pulse-glow">
                <Icon name="Bell" size={16} className="mr-1" />
                Новое сообщение
              </Badge>
            )}
          </div>

          {showNameInput && (
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 border-b">
              <div className="flex items-center gap-3">
                <Input
                  placeholder="Введите ваше имя..."
                  value={tempUsername}
                  onChange={(e) => setTempUsername(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSetUsername()}
                  className="flex-1"
                />
                <Button onClick={handleSetUsername} variant="secondary">
                  <Icon name="Check" size={20} className="mr-2" />
                  Сохранить
                </Button>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin">
                  <Icon name="Loader2" size={32} className="text-primary" />
                </div>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Icon name="MessageCircle" size={48} className="text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-lg">
                  Пока нет сообщений. Будьте первым!
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 animate-fade-in ${
                    isMyMessage(message) ? "flex-row-reverse" : ""
                  }`}
                >
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className={
                      message.isCreator 
                        ? "bg-gradient-to-br from-primary to-secondary text-white font-bold" 
                        : isMyMessage(message)
                        ? "bg-accent text-white"
                        : "bg-muted text-foreground"
                    }>
                      {message.isCreator ? "👨‍💻" : message.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`max-w-[70%] ${isMyMessage(message) ? "text-right" : ""}`}>
                    {!isMyMessage(message) && (
                      <p className="text-xs font-medium text-muted-foreground mb-1 px-2">
                        {message.username}
                        {message.isCreator && " 👑"}
                      </p>
                    )}
                    <div
                      className={`rounded-2xl px-5 py-3 shadow-md hover-lift ${
                        message.isCreator
                          ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-foreground border-2 border-primary/30"
                          : isMyMessage(message)
                          ? "bg-gradient-to-r from-accent to-accent/90 text-white"
                          : "bg-gradient-to-r from-muted/50 to-muted/30 text-foreground"
                      }`}
                    >
                      <p className="text-base leading-relaxed break-words">{message.text}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 px-2">
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 border-t bg-white/50">
            <div className="flex items-center gap-3">
              <Input
                placeholder="Напишите сообщение..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 text-base py-6 px-5 rounded-2xl border-2 focus:border-primary transition-all"
              />
              <Button
                onClick={handleSendMessage}
                size="lg"
                className="px-8 py-6 rounded-2xl hover-lift shadow-lg"
                disabled={!inputValue.trim()}
              >
                <Icon name="Send" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
