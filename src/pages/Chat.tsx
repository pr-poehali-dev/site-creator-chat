import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Message {
  id: number;
  text: string;
  sender: "user" | "creator";
  timestamp: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Привет! Добро пожаловать в чат. Чем могу помочь?",
      sender: "creator",
      timestamp: "10:30"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
    };

    setMessages([...messages, newUserMessage]);
    setInputValue("");

    setTimeout(() => {
      const creatorResponse: Message = {
        id: messages.length + 2,
        text: "Спасибо за сообщение! Это демо-версия чата. В реальной версии здесь будет живое общение.",
        sender: "creator",
        timestamp: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
      };
      setMessages(prev => [...prev, creatorResponse]);
      setHasNewMessage(true);
      
      setTimeout(() => setHasNewMessage(false), 3000);
    }, 1000);
  };

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
                <AvatarFallback className="bg-white text-primary font-bold">СС</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-heading font-bold text-white">Создатель сайта</h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse-glow"></div>
                  <span className="text-sm text-white/90">Онлайн</span>
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

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 animate-fade-in ${
                  message.sender === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <Avatar className="w-10 h-10">
                  <AvatarFallback className={message.sender === "user" ? "bg-accent text-white" : "bg-primary text-white"}>
                    {message.sender === "user" ? "Я" : "СС"}
                  </AvatarFallback>
                </Avatar>
                <div className={`max-w-[70%] ${message.sender === "user" ? "text-right" : ""}`}>
                  <div
                    className={`rounded-2xl px-5 py-3 shadow-md hover-lift ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-accent to-accent/90 text-white"
                        : "bg-gradient-to-r from-primary/10 to-secondary/10 text-foreground"
                    }`}
                  >
                    <p className="text-base leading-relaxed">{message.text}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 px-2">
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
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
