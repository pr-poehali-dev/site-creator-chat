import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";

const About = () => {
  const skills = [
    { name: "React", icon: "Code2", color: "bg-blue-500" },
    { name: "TypeScript", icon: "FileCode", color: "bg-blue-600" },
    { name: "Design", icon: "Palette", color: "bg-purple-500" },
    { name: "UX/UI", icon: "Layers", color: "bg-pink-500" }
  ];

  const achievements = [
    { number: "500+", label: "Проектов", icon: "Briefcase" },
    { number: "1000+", label: "Часов работы", icon: "Clock" },
    { number: "50+", label: "Довольных клиентов", icon: "Users" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50 to-pink-50">
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
            <Link to="/chat">
              <Button variant="ghost" className="hover-scale">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Чат
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-20 pb-12 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="relative inline-block mb-8">
              <Avatar className="w-32 h-32 border-4 border-white shadow-2xl animate-float">
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-4xl font-bold">
                  СС
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white animate-pulse-glow flex items-center justify-center">
                <Icon name="Check" size={20} className="text-white" />
              </div>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-heading font-extrabold gradient-text mb-4">
              Создатель ChatSpace
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Разработчик, дизайнер и создатель современных веб-приложений
            </p>
          </div>

          <Card className="p-10 mb-12 shadow-xl hover-lift bg-white/90 backdrop-blur-sm animate-scale-in">
            <h3 className="text-3xl font-heading font-bold mb-6 gradient-text">
              О проекте
            </h3>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                ChatSpace — это мой личный проект, созданный с целью открытого общения. 
                Я верю, что прямая связь между создателем и пользователями делает продукт лучше.
              </p>
              <p>
                Платформа построена с использованием современных технологий и лучших практик 
                веб-разработки. Каждая деталь продумана для создания комфортного опыта общения.
              </p>
              <p>
                Я всегда открыт для обратной связи, новых идей и конструктивной критики. 
                Давайте создавать что-то крутое вместе!
              </p>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8 shadow-xl hover-lift bg-white/90 backdrop-blur-sm animate-scale-in">
              <h3 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
                <Icon name="Sparkles" className="text-primary" size={28} />
                Навыки
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 hover-scale"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`w-10 h-10 ${skill.color} rounded-lg flex items-center justify-center`}>
                      <Icon name={skill.icon as any} size={20} className="text-white" />
                    </div>
                    <span className="font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8 shadow-xl hover-lift bg-white/90 backdrop-blur-sm animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
                <Icon name="Trophy" className="text-secondary" size={28} />
                Достижения
              </h3>
              <div className="space-y-6">
                {achievements.map((achievement, index) => (
                  <div
                    key={achievement.label}
                    className="flex items-center gap-4"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                      <Icon name={achievement.icon as any} size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold gradient-text">{achievement.number}</div>
                      <div className="text-sm text-muted-foreground">{achievement.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card className="p-10 text-center shadow-xl bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 animate-scale-in">
            <Icon name="Mail" size={48} className="text-primary mx-auto mb-4" />
            <h3 className="text-3xl font-heading font-bold mb-4 gradient-text">
              Свяжись со мной
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Есть вопросы, предложения или просто хочешь поболтать? 
              Переходи в чат — я всегда рад общению!
            </p>
            <Link to="/chat">
              <Button size="lg" className="text-lg px-12 py-6 hover-lift shadow-xl">
                <Icon name="MessageSquare" size={20} className="mr-2" />
                Открыть чат
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      <footer className="py-12 px-6 border-t mt-12">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 ChatSpace. Создано с любовью к общению.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
