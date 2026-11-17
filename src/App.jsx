import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Home,
  Plus,
  CreditCard,
  Repeat,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Building2,
  CheckCircle2,
  Trash2,
  Edit3,
  Download,
  Upload,
  Filter,
  ShoppingBag,
  Utensils,
  Car,
  Home as HomeIcon,
  Gamepad2,
  HeartPulse,
  GraduationCap,
  MoreHorizontal,
  X,
  Users,
  Calendar,
  Sparkles,
  AlertCircle,
  RefreshCw,
  DollarSign,
  Zap,
  BarChart3,
  PieChart as PieChartIcon,
  TrendingUp,
  Delete,
  Search,
  Lock,
  Mail,
  User,
  LogOut,
  Key,
  ShieldCheck,
  Eye,
  EyeOff,
  Smartphone
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid
} from 'recharts';

// ============================================================================
// CONSTANTES E CONFIGURAÇÕES INICIAIS (PT-BR)
// ============================================================================

const STORAGE_KEY = 'financas_familia_v2';
const STORAGE_USERS = 'financas_auth_users_v1';
const STORAGE_SESSION = 'financas_auth_session_v1';
const COPYRIGHT_NOTE = 'Este app é de produção do Engº Murilo Miranda da Silva e de uso restrito';

const CATEGORIES = [
  { id: 'mercado', label: 'Mercado', icon: ShoppingBag, color: 'bg-emerald-500', hex: '#10b981', text: 'text-emerald-600', bgLight: 'bg-emerald-50' },
  { id: 'alimentacao', label: 'Alimentação', icon: Utensils, color: 'bg-orange-500', hex: '#f97316', text: 'text-orange-600', bgLight: 'bg-orange-50' },
  { id: 'transporte', label: 'Transporte', icon: Car, color: 'bg-blue-500', hex: '#3b82f6', text: 'text-blue-600', bgLight: 'bg-blue-50' },
  { id: 'casa', label: 'Casa', icon: HomeIcon, color: 'bg-indigo-500', hex: '#6366f1', text: 'text-indigo-600', bgLight: 'bg-indigo-50' },
  { id: 'lazer', label: 'Lazer', icon: Gamepad2, color: 'bg-purple-500', hex: '#a855f7', text: 'text-purple-600', bgLight: 'bg-purple-50' },
  { id: 'saude', label: 'Saúde', icon: HeartPulse, color: 'bg-rose-500', hex: '#f43f5e', text: 'text-rose-600', bgLight: 'bg-rose-50' },
  { id: 'educacao', label: 'Educação', icon: GraduationCap, color: 'bg-cyan-500', hex: '#06b6d4', text: 'text-cyan-600', bgLight: 'bg-cyan-50' },
  { id: 'outros', label: 'Outros', icon: MoreHorizontal, color: 'bg-slate-500', hex: '#64748b', text: 'text-slate-600', bgLight: 'bg-slate-100' },
];

const PAYMENT_METHODS = [
  { id: 'credito', label: 'Crédito', badge: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 'debito', label: 'Débito', badge: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'pix', label: 'Pix', badge: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { id: 'dinheiro', label: 'Dinheiro', badge: 'bg-amber-100 text-amber-700 border-amber-200' },
];

const BANK_THEMES = [
  { id: 'nubank', name: 'Roxo (Nubank)', gradient: 'from-purple-700 to-purple-900', accent: '#820AD1' },
  { id: 'itau', name: 'Laranja (Itaú)', gradient: 'from-orange-500 to-orange-700', accent: '#EC7000' },
  { id: 'inter', name: 'Laranja Claro (Inter)', gradient: 'from-amber-500 to-orange-600', accent: '#FF7A00' },
  { id: 'bradesco', name: 'Vermelho (Bradesco)', gradient: 'from-red-600 to-red-800', accent: '#CC092F' },
  { id: 'caixa', name: 'Azul (Caixa / BB)', gradient: 'from-blue-600 to-blue-800', accent: '#005CA9' },
  { id: 'santander', name: 'Carmesim (Santander)', gradient: 'from-rose-600 to-red-800', accent: '#EC0000' },
  { id: 'c6', name: 'Grafite (C6 / Black)', gradient: 'from-zinc-800 to-zinc-950', accent: '#242424' },
  { id: 'sicredi', name: 'Verde (Sicredi / Sicoob)', gradient: 'from-emerald-600 to-emerald-800', accent: '#3FA110' },
];

const FAMILY_MEMBERS = ['Família', 'Murilo', 'Ana', 'Filhos', 'Casa'];

const INITIAL_SAMPLE_DATA = {
  isSample: true,
  banks: [
    {
      id: 'bank-1',
      name: 'Nubank',
      balance: 3450.80,
      creditLimit: 5000.00,
      currentInvoice: 1245.50,
      dueDay: 10,
      theme: 'nubank',
    },
    {
      id: 'bank-2',
      name: 'Itaú',
      balance: 6820.00,
      creditLimit: 8500.00,
      currentInvoice: 890.00,
      dueDay: 15,
      theme: 'itau',
    },
    {
      id: 'bank-3',
      name: 'Inter',
      balance: 1420.35,
      creditLimit: 3000.00,
      currentInvoice: 310.90,
      dueDay: 5,
      theme: 'inter',
    },
  ],
  transactions: [
    {
      id: 'tx-1',
      type: 'expense',
      amount: 485.90,
      description: 'Compras do Mês - Supermercado',
      category: 'mercado',
      date: new Date().toISOString().split('T')[0],
      member: 'Família',
      paymentMethod: 'credito',
      bankId: 'bank-1',
    },
    {
      id: 'tx-2',
      type: 'expense',
      amount: 89.90,
      description: 'Abastecimento Posto Shell',
      category: 'transporte',
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      member: 'Murilo',
      paymentMethod: 'pix',
      bankId: 'bank-2',
    },
    {
      id: 'tx-3',
      type: 'expense',
      amount: 142.00,
      description: 'Jantar Pizzaria em Família',
      category: 'alimentacao',
      date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
      member: 'Família',
      paymentMethod: 'credito',
      bankId: 'bank-2',
    },
    {
      id: 'tx-4',
      type: 'income',
      amount: 4500.00,
      description: 'Salário Mensal',
      category: 'outros',
      date: new Date(Date.now() - 432000000).toISOString().split('T')[0],
      member: 'Murilo',
      paymentMethod: 'pix',
      bankId: 'bank-2',
    },
    {
      id: 'tx-5',
      type: 'income',
      amount: 3200.00,
      description: 'Salário Ana',
      category: 'outros',
      date: new Date(Date.now() - 518400000).toISOString().split('T')[0],
      member: 'Ana',
      paymentMethod: 'pix',
      bankId: 'bank-1',
    },
    {
      id: 'tx-prev-1',
      type: 'income',
      amount: 7500.00,
      description: 'Renda Familiar Mês Anterior',
      category: 'outros',
      date: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 5).toISOString().split('T')[0],
      member: 'Família',
      paymentMethod: 'pix',
      bankId: 'bank-2',
    },
    {
      id: 'tx-prev-2',
      type: 'expense',
      amount: 4820.00,
      description: 'Despesas Gerais Mês Anterior',
      category: 'mercado',
      date: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 18).toISOString().split('T')[0],
      member: 'Família',
      paymentMethod: 'credito',
      bankId: 'bank-1',
    },
    {
      id: 'tx-prev-3',
      type: 'income',
      amount: 7400.00,
      description: 'Renda Familiar 2 Meses Atrás',
      category: 'outros',
      date: new Date(new Date().getFullYear(), new Date().getMonth() - 2, 5).toISOString().split('T')[0],
      member: 'Família',
      paymentMethod: 'pix',
      bankId: 'bank-2',
    },
    {
      id: 'tx-prev-4',
      type: 'expense',
      amount: 5390.00,
      description: 'Despesas Gerais 2 Meses Atrás',
      category: 'casa',
      date: new Date(new Date().getFullYear(), new Date().getMonth() - 2, 20).toISOString().split('T')[0],
      member: 'Família',
      paymentMethod: 'credito',
      bankId: 'bank-2',
    },
  ],
  subscriptions: [
    {
      id: 'sub-1',
      name: 'Netflix 4K',
      amount: 59.90,
      billingDay: 12,
      paymentMethod: 'credito',
      bankId: 'bank-1',
      category: 'lazer',
    },
    {
      id: 'sub-2',
      name: 'Internet Fibra 600MB',
      amount: 119.90,
      billingDay: 10,
      paymentMethod: 'debito',
      bankId: 'bank-2',
      category: 'casa',
    },
    {
      id: 'sub-3',
      name: 'Spotify Família',
      amount: 34.90,
      billingDay: 5,
      paymentMethod: 'credito',
      bankId: 'bank-3',
      category: 'lazer',
    },
    {
      id: 'sub-4',
      name: 'Academia SmartFit',
      amount: 139.90,
      billingDay: 20,
      paymentMethod: 'credito',
      bankId: 'bank-1',
      category: 'saude',
    },
  ],
  quickPresets: [
    {
      id: 'qp-1',
      label: 'Padaria / Café',
      amount: 18.50,
      category: 'alimentacao',
      paymentMethod: 'pix',
      bankId: 'bank-1',
    },
    {
      id: 'qp-2',
      label: 'Combustível',
      amount: 100.00,
      category: 'transporte',
      paymentMethod: 'credito',
      bankId: 'bank-2',
    },
    {
      id: 'qp-3',
      label: 'Almoço',
      amount: 35.00,
      category: 'alimentacao',
      paymentMethod: 'debito',
      bankId: 'bank-1',
    },
    {
      id: 'qp-4',
      label: 'Mercado Rápido',
      amount: 0,
      category: 'mercado',
      paymentMethod: 'credito',
      bankId: 'bank-1',
    },
  ],
};

// ============================================================================
// UTILITÁRIOS
// ============================================================================

const formatBRL = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value) || 0);
};

const formatDateBR = (dateStr) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
};

const getThemeConfig = (themeId) => {
  return BANK_THEMES.find((t) => t.id === themeId) || BANK_THEMES[0];
};

const getCategoryConfig = (catId) => {
  return CATEGORIES.find((c) => c.id === catId) || CATEGORIES[CATEGORIES.length - 1];
};

const getPaymentConfig = (payId) => {
  return PAYMENT_METHODS.find((p) => p.id === payId) || PAYMENT_METHODS[0];
};

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function App() {
  // Controle de Sessão e Usuários
  const [session, setSession] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SESSION);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Notificação Toast
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3400);
  };

  // Suporte à instalação PWA nativa no Android
  const [installPromptEvent, setInstallPromptEvent] = useState(null);
  const [showInstallGuide, setShowInstallGuide] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPromptEvent(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleTriggerInstall = async () => {
    if (installPromptEvent) {
      installPromptEvent.prompt();
      const choice = await installPromptEvent.userChoice;
      if (choice.outcome === 'accepted') {
        showToast('Aplicativo instalado com sucesso!');
        setInstallPromptEvent(null);
      }
    } else {
      setShowInstallGuide(true);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem(STORAGE_SESSION);
    setSession(null);
    showToast('Você saiu da sua conta.', 'info');
  };

  // Se não estiver logado, exibe a tela de Autenticação (Login / Cadastro / Recuperação)
  if (!session) {
    return (
      <AuthScreen
        onLoginSuccess={(user) => {
          setSession(user);
          localStorage.setItem(STORAGE_SESSION, JSON.stringify(user));
          showToast(`Bem-vindo, ${user.name}!`);
        }}
        showToast={showToast}
        onInstallClick={handleTriggerInstall}
        showInstallGuide={showInstallGuide}
        setShowInstallGuide={setShowInstallGuide}
      />
    );
  }

  return (
    <MainApp
      session={session}
      onLogout={handleLogout}
      toast={toast}
      showToast={showToast}
      onInstallClick={handleTriggerInstall}
      showInstallGuide={showInstallGuide}
      setShowInstallGuide={setShowInstallGuide}
    />
  );
}

// ============================================================================
// TELA DE LOGIN / CADASTRO / RECUPERAÇÃO DE SENHA
// ============================================================================

function AuthScreen({
  onLoginSuccess,
  showToast,
  onInstallClick,
  showInstallGuide,
  setShowInstallGuide,
}) {
  const [view, setView] = useState('login'); // 'login' | 'register' | 'forgot'
  const [showPassword, setShowPassword] = useState(false);

  // Formulário Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Formulário Cadastro
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // Formulário Recuperação
  const [forgotEmail, setForgotEmail] = useState('');
  const [recoveredCode, setRecoveredCode] = useState(null);
  const [newPassword, setNewPassword] = useState('');

  // Obtém lista de usuários salvos
  const getUsers = () => {
    try {
      const saved = localStorage.getItem(STORAGE_USERS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Usuário padrão inicial (Engº Murilo)
    const initialUsers = [
      {
        id: 'user-murilo',
        name: 'Murilo Miranda da Silva',
        email: 'murilo@eng.com',
        password: 'admin',
      },
    ];
    localStorage.setItem(STORAGE_USERS, JSON.stringify(initialUsers));
    return initialUsers;
  };

  const saveUsers = (users) => {
    localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
  };

  // Login
  const handleLogin = (e) => {
    e.preventDefault();
    const users = getUsers();
    const user = users.find(
      (u) =>
        u.email.trim().toLowerCase() === loginEmail.trim().toLowerCase() &&
        u.password === loginPassword
    );

    if (user) {
      onLoginSuccess(user);
    } else {
      showToast('E-mail ou senha incorretos.', 'error');
    }
  };

  // Cadastro
  const handleRegister = (e) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim() || !regPassword) {
      showToast('Preencha todos os campos.', 'error');
      return;
    }
    if (regPassword.length < 4) {
      showToast('A senha deve ter pelo menos 4 caracteres.', 'error');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      showToast('As senhas não coincidem.', 'error');
      return;
    }

    const users = getUsers();
    const exists = users.some(
      (u) => u.email.trim().toLowerCase() === regEmail.trim().toLowerCase()
    );
    if (exists) {
      showToast('Este e-mail já está cadastrado.', 'error');
      return;
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: regName.trim(),
      email: regEmail.trim().toLowerCase(),
      password: regPassword,
    };

    saveUsers([...users, newUser]);
    showToast('Conta criada com sucesso!');
    onLoginSuccess(newUser);
  };

  // Recuperação de Senha
  const handleForgot = (e) => {
    e.preventDefault();
    const users = getUsers();
    const user = users.find(
      (u) => u.email.trim().toLowerCase() === forgotEmail.trim().toLowerCase()
    );

    if (!user) {
      showToast('E-mail não encontrado no sistema.', 'error');
      return;
    }

    // Gera um código de segurança de 6 dígitos para redefinir na hora
    const code = Math.floor(100000 + Math.random() * 900000);
    setRecoveredCode({ email: user.email, code });
    showToast(`Código de recuperação gerado: ${code}`, 'info');
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 4) {
      showToast('Digite uma nova senha de no mínimo 4 caracteres.', 'error');
      return;
    }

    const users = getUsers();
    const updated = users.map((u) =>
      u.email === recoveredCode.email ? { ...u, password: newPassword } : u
    );
    saveUsers(updated);
    showToast('Senha redefinida com sucesso! Faça login.');
    setView('login');
    setRecoveredCode(null);
    setLoginEmail(recoveredCode.email);
    setLoginPassword('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between font-sans selection:bg-purple-300 relative px-4 py-6">
      {/* Botão de Instalar no Celular */}
      <div className="w-full max-w-sm mx-auto flex justify-end">
        <button
          onClick={onInstallClick}
          className="bg-amber-400 hover:bg-amber-300 text-purple-950 text-xs font-black px-3.5 py-2 rounded-2xl flex items-center gap-1.5 shadow-md active:scale-95 transition"
        >
          <Smartphone className="w-4 h-4" />
          Baixar no Celular
        </button>
      </div>

      <div className="w-full max-w-sm mx-auto my-auto space-y-6">
        {/* LOGO E TÍTULO */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/20 ring-4 ring-purple-900/50">
            <Wallet className="w-9 h-9 text-purple-950" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Finanças em Família</h1>
          <p className="text-xs text-purple-300 font-medium">
            Gestão patrimonial, cartões e despesas familiares
          </p>
        </div>

        {/* CARD PRINCIPAL DE AUTENTICAÇÃO */}
        <div className="bg-slate-800/90 border border-purple-900/60 rounded-3xl p-6 shadow-2xl backdrop-blur-md">
          {/* ============================================================== */}
          {/* TELA DE LOGIN */}
          {/* ============================================================== */}
          {view === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400" />
                  Acesso ao Sistema
                </h2>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-purple-950 text-amber-300 border border-amber-400/30">
                  Restrito
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">E-mail</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="seu.email@exemplo.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-slate-900/80 border border-slate-700 rounded-2xl pl-10 pr-3.5 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-300">Senha</label>
                  <button
                    type="button"
                    onClick={() => setView('forgot')}
                    className="text-[11px] text-amber-300 hover:underline font-semibold"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-slate-900/80 border border-slate-700 rounded-2xl pl-10 pr-10 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-purple-950 font-black py-3.5 rounded-2xl text-sm shadow-lg shadow-amber-500/20 active:scale-95 transition mt-2"
              >
                Entrar no App
              </button>

              <div className="pt-3 text-center border-t border-slate-700/60">
                <p className="text-xs text-slate-400">
                  Ainda não tem acesso?{' '}
                  <button
                    type="button"
                    onClick={() => setView('register')}
                    className="text-amber-300 font-extrabold hover:underline"
                  >
                    Cadastre-se aqui
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* ============================================================== */}
          {/* TELA DE CADASTRO */}
          {/* ============================================================== */}
          {view === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-amber-400" />
                  Novo Cadastro
                </h2>
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Voltar
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Nome Completo</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Seu nome ou apelido"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full bg-slate-900/80 border border-slate-700 rounded-2xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">E-mail</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="seu.email@exemplo.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full bg-slate-900/80 border border-slate-700 rounded-2xl pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Senha</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full bg-slate-900/80 border border-slate-700 rounded-2xl px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Confirmar</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    className="w-full bg-slate-900/80 border border-slate-700 rounded-2xl px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-purple-950 font-black py-3 rounded-2xl text-sm shadow-md active:scale-95 transition mt-2"
              >
                Criar Conta e Acessar
              </button>

              <div className="pt-2 text-center border-t border-slate-700/60">
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="text-xs text-purple-300 hover:underline"
                >
                  Já tenho conta? Fazer login
                </button>
              </div>
            </form>
          )}

          {/* ============================================================== */}
          {/* TELA DE RECUPERAÇÃO DE SENHA */}
          {/* ============================================================== */}
          {view === 'forgot' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Key className="w-4 h-4 text-amber-400" />
                  Recuperar Senha
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setView('login');
                    setRecoveredCode(null);
                  }}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Voltar
                </button>
              </div>

              {!recoveredCode ? (
                <form onSubmit={handleForgot} className="space-y-3">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Informe seu e-mail cadastrado. Um código de segurança será gerado para que você redefina sua senha.
                  </p>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">E-mail Cadastrado</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="seu.email@exemplo.com"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className="w-full bg-slate-900/80 border border-slate-700 rounded-2xl pl-10 pr-3.5 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-purple-700 hover:bg-purple-600 text-white font-extrabold py-3.5 rounded-2xl text-sm shadow active:scale-95 transition"
                  >
                    Gerar Código de Recuperação
                  </button>
                </form>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-3">
                  <div className="p-3 bg-amber-400/15 border border-amber-400/40 rounded-2xl text-xs text-amber-300">
                    <p className="font-bold">Código gerado para {recoveredCode.email}:</p>
                    <p className="text-xl font-black text-amber-400 tracking-widest mt-1">
                      {recoveredCode.code}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Digite sua Nova Senha
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Mínimo 4 caracteres"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-slate-900/80 border border-slate-700 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3.5 rounded-2xl text-sm shadow active:scale-95 transition"
                  >
                    Salvar Nova Senha
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>

      {/* NOTA DE RODAPÉ OBRIGATÓRIA */}
      <footer className="w-full text-center pt-4 pb-2">
        <p className="text-[11px] text-slate-400 font-semibold tracking-wide flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>{COPYRIGHTNOTE_OR_TEXT(COPYRIGHT_NOTE)}</span>
        </p>
      </footer>

      {/* Modal Guia de Instalação no Android */}
      {showInstallGuide && (
        <InstallGuideModal onClose={() => setShowInstallGuide(false)} />
      )}
    </div>
  );
}

function COPYRIGHTNOTE_OR_TEXT(text) {
  return text;
}

// ============================================================================
// GUIA DE INSTALAÇÃO NO ANDROID (PWA NATIVO)
// ============================================================================

function InstallGuideModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-purple-800 rounded-3xl p-6 max-w-sm w-full space-y-4 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-amber-400" />
            Como Baixar no Android
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 bg-slate-800 text-slate-400 hover:text-white rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <div className="flex gap-2.5 items-start">
            <span className="w-5 h-5 rounded-full bg-amber-400 text-purple-950 font-black flex items-center justify-center shrink-0">
              1
            </span>
            <p>
              Abra este link no navegador <strong>Google Chrome</strong> do seu celular Android.
            </p>
          </div>

          <div className="flex gap-2.5 items-start">
            <span className="w-5 h-5 rounded-full bg-amber-400 text-purple-950 font-black flex items-center justify-center shrink-0">
              2
            </span>
            <p>
              Toque no menu de <strong>três pontinhos (⋮)</strong> no canto superior direito do Chrome.
            </p>
          </div>

          <div className="flex gap-2.5 items-start">
            <span className="w-5 h-5 rounded-full bg-amber-400 text-purple-950 font-black flex items-center justify-center shrink-0">
              3
            </span>
            <p>
              Toque em <strong>"Instalar aplicativo"</strong> ou <strong>"Adicionar à tela inicial"</strong>.
            </p>
          </div>

          <div className="flex gap-2.5 items-start">
            <span className="w-5 h-5 rounded-full bg-amber-400 text-purple-950 font-black flex items-center justify-center shrink-0">
              4
            </span>
            <p>
              Pronto! O app será adicionado com ícone próprio na sua tela e abrirá em tela cheia como qualquer app nativo.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-purple-950 font-black rounded-2xl text-xs active:scale-95 shadow"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// APLICAÇÃO FINANCEIRA COMPLETA (MAIN APP)
// ============================================================================

function MainApp({
  session,
  onLogout,
  toast,
  showToast,
  onInstallClick,
  showInstallGuide,
  setShowInstallGuide,
}) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('financas_familia_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_SAMPLE_DATA,
          ...parsed,
          quickPresets: parsed.quickPresets || INITIAL_SAMPLE_DATA.quickPresets,
        };
      }
    } catch (e) {
      console.error('Erro ao ler dados locais:', e);
    }
    return INITIAL_SAMPLE_DATA;
  });

  const [activeTab, setActiveTab] = useState('resumo');

  const [quickLaunchModal, setQuickLaunchModal] = useState({ open: false, preset: null });
  const [presetModal, setPresetModal] = useState({ open: false, preset: null });
  const [bankModal, setBankModal] = useState({ open: false, bank: null });
  const [depositModal, setDepositModal] = useState({ open: false, bank: null });
  const [subModal, setSubModal] = useState({ open: false, sub: null });
  const [confirmDialog, setConfirmDialog] = useState({ open: false, title: '', message: '', onConfirm: null });

  const [filterBank, setFilterBank] = useState('all');
  const [filterPayment, setFilterPayment] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [expenseForm, setExpenseForm] = useState({
    amount: '',
    description: '',
    category: 'mercado',
    date: new Date().toISOString().split('T')[0],
    member: session?.name?.split(' ')[0] || 'Família',
    paymentMethod: 'credito',
    bankId: '',
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (data.banks.length > 0 && !data.banks.some((b) => b.id === expenseForm.bankId)) {
      setExpenseForm((prev) => ({ ...prev, bankId: data.banks[0].id }));
    }
  }, [data.banks, expenseForm.bankId]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Erro ao salvar no localStorage:', e);
    }
  }, [data]);

  const totals = useMemo(() => {
    const totalBalance = data.banks.reduce((acc, b) => acc + (Number(b.balance) || 0), 0);
    const totalInvoices = data.banks.reduce((acc, b) => acc + (Number(b.currentInvoice) || 0), 0);
    const totalSubscriptions = data.subscriptions.reduce((acc, s) => acc + (Number(s.amount) || 0), 0);

    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7);
    const monthlyExpenses = data.transactions.filter(
      (t) => t.type === 'expense' && t.date.startsWith(currentMonth)
    );
    const monthlyIncomes = data.transactions.filter(
      (t) => t.type === 'income' && t.date.startsWith(currentMonth)
    );

    const totalMonthlySpent = monthlyExpenses.reduce((acc, t) => acc + (Number(t.amount) || 0), 0);
    const totalMonthlyIncome = monthlyIncomes.reduce((acc, t) => acc + (Number(t.amount) || 0), 0);
    const monthlyNetBalance = Number((totalMonthlyIncome - totalMonthlySpent).toFixed(2));

    const creditSubscriptions = data.subscriptions.filter((s) => s.paymentMethod === 'credito');
    const pendingCreditSubsAmount = creditSubscriptions.reduce((acc, sub) => {
      const alreadyLaunchedThisMonth = monthlyExpenses.some(
        (tx) =>
          tx.paymentMethod === 'credito' &&
          tx.description.toLowerCase().includes(sub.name.toLowerCase())
      );
      return alreadyLaunchedThisMonth ? acc : acc + (Number(sub.amount) || 0);
    }, 0);

    const projectedCreditInvoice = Number((totalInvoices + pendingCreditSubsAmount).toFixed(2));
    const totalCreditLimit = data.banks.reduce((acc, b) => acc + (Number(b.creditLimit) || 0), 0);
    const projectedInvoiceRatio =
      totalCreditLimit > 0 ? Math.min(100, Math.round((projectedCreditInvoice / totalCreditLimit) * 100)) : 0;

    const byCategory = CATEGORIES.map((cat) => {
      const sum = monthlyExpenses
        .filter((t) => t.category === cat.id)
        .reduce((acc, t) => acc + (Number(t.amount) || 0), 0);
      return {
        ...cat,
        name: cat.label,
        total: Number(sum.toFixed(2)),
        percentage: totalMonthlySpent > 0 ? Math.round((sum / totalMonthlySpent) * 100) : 0,
      };
    })
      .filter((c) => c.total > 0)
      .sort((a, b) => b.total - a.total);

    const byBankUsage = data.banks.map((bank) => {
      const debitPixSpent = monthlyExpenses
        .filter((t) => t.bankId === bank.id && t.paymentMethod !== 'credito')
        .reduce((acc, t) => acc + (Number(t.amount) || 0), 0);
      const creditInvoice = Number(bank.currentInvoice) || 0;
      const creditLimit = Number(bank.creditLimit) || 0;
      const availableLimit = Math.max(0, creditLimit - creditInvoice);

      return {
        id: bank.id,
        name: bank.name,
        debitoPix: Number(debitPixSpent.toFixed(2)),
        faturaCredito: Number(creditInvoice.toFixed(2)),
        limiteDisponivel: Number(availableLimit.toFixed(2)),
        limiteTotal: creditLimit,
        saldo: Number(bank.balance) || 0,
        usoPercentual: creditLimit > 0 ? Math.min(100, Math.round((creditInvoice / creditLimit) * 100)) : 0,
      };
    });

    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const dailyEvolution = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const dayStr = String(day).padStart(2, '0');
      const fullDate = `${currentMonth}-${dayStr}`;
      const daySum = monthlyExpenses
        .filter((t) => t.date === fullDate)
        .reduce((acc, t) => acc + (Number(t.amount) || 0), 0);
      dailyEvolution.push({
        dia: dayStr,
        dataCompleta: `${dayStr}/${currentMonth.slice(5, 7)}`,
        valor: Number(daySum.toFixed(2)),
      });
    }

    const monthNamesPT = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const monthlyComparison = [];
    for (let i = 5; i >= 0; i--) {
      const refDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const ym = `${refDate.getFullYear()}-${String(refDate.getMonth() + 1).padStart(2, '0')}`;
      const label = `${monthNamesPT[refDate.getMonth()]}/${String(refDate.getFullYear()).slice(-2)}`;

      const monthTxs = data.transactions.filter((t) => t.date.startsWith(ym));
      const recebido = monthTxs
        .filter((t) => t.type === 'income')
        .reduce((acc, t) => acc + (Number(t.amount) || 0), 0);
      const gastos = monthTxs
        .filter((t) => t.type === 'expense')
        .reduce((acc, t) => acc + (Number(t.amount) || 0), 0);
      const credito = monthTxs
        .filter((t) => t.type === 'expense' && t.paymentMethod === 'credito')
        .reduce((acc, t) => acc + (Number(t.amount) || 0), 0);

      monthlyComparison.push({
        mes: label,
        recebido: Number(recebido.toFixed(2)),
        gastos: Number(gastos.toFixed(2)),
        credito: Number(credito.toFixed(2)),
        saldoMes: Number((recebido - gastos).toFixed(2)),
      });
    }

    const recentDescriptions = Array.from(
      new Set(
        data.transactions
          .filter((t) => t.type === 'expense' && t.description)
          .map((t) => t.description.trim())
      )
    ).slice(0, 8);

    return {
      totalBalance,
      totalInvoices,
      totalSubscriptions,
      totalMonthlySpent,
      totalMonthlyIncome,
      monthlyNetBalance,
      pendingCreditSubsAmount,
      projectedCreditInvoice,
      projectedInvoiceRatio,
      byCategory,
      byBankUsage,
      dailyEvolution,
      monthlyComparison,
      recentDescriptions,
    };
  }, [data]);

  const filteredTransactions = useMemo(() => {
    return data.transactions
      .filter((tx) => {
        if (filterBank !== 'all' && tx.bankId !== filterBank) return false;
        if (filterPayment !== 'all' && tx.paymentMethod !== filterPayment) return false;
        if (
          searchQuery.trim() &&
          !tx.description.toLowerCase().includes(searchQuery.trim().toLowerCase())
        ) {
          return false;
        }
        return true;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [data.transactions, filterBank, filterPayment, searchQuery]);

  const executeExpenseCreation = ({
    amount,
    description,
    category,
    date,
    member,
    paymentMethod,
    bankId,
  }) => {
    const numericAmount = parseFloat(String(amount).replace(',', '.'));
    if (!numericAmount || numericAmount <= 0) {
      showToast('Informe um valor válido maior que R$ 0,00.', 'error');
      return false;
    }
    if (!bankId) {
      showToast('Selecione um banco ou cartão.', 'error');
      return false;
    }

    const catObj = getCategoryConfig(category);
    const finalDescription = description?.trim() || catObj.label;

    const newTx = {
      id: `tx-${Date.now()}`,
      type: 'expense',
      amount: Number(numericAmount.toFixed(2)),
      description: finalDescription,
      category: category || 'outros',
      date: date || new Date().toISOString().split('T')[0],
      member: member || session?.name?.split(' ')[0] || 'Família',
      paymentMethod: paymentMethod || 'credito',
      bankId,
    };

    const updatedBanks = data.banks.map((bank) => {
      if (bank.id !== bankId) return bank;
      if (paymentMethod === 'credito') {
        return {
          ...bank,
          currentInvoice: Number((bank.currentInvoice + numericAmount).toFixed(2)),
        };
      } else {
        return {
          ...bank,
          balance: Number((bank.balance - numericAmount).toFixed(2)),
        };
      }
    });

    setData((prev) => ({
      ...prev,
      isSample: false,
      banks: updatedBanks,
      transactions: [newTx, ...prev.transactions],
    }));

    const targetBank = data.banks.find((b) => b.id === bankId);
    const actionLabel =
      paymentMethod === 'credito'
        ? `na fatura do ${targetBank?.name}`
        : `no saldo do ${targetBank?.name}`;

    showToast(`⚡ ${finalDescription}: ${formatBRL(numericAmount)} lançado ${actionLabel}!`);
    return true;
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!expenseForm.description.trim()) {
      showToast('Digite uma descrição para o gasto.', 'error');
      return;
    }
    const ok = executeExpenseCreation(expenseForm);
    if (ok) {
      setExpenseForm((prev) => ({
        ...prev,
        amount: '',
        description: '',
      }));
      setActiveTab('resumo');
    }
  };

  const handleOneTapPreset = (preset) => {
    const bankExists = data.banks.some((b) => b.id === preset.bankId);
    const targetBankId = bankExists ? preset.bankId : data.banks[0]?.id;

    if (!preset.amount || Number(preset.amount) <= 0) {
      setQuickLaunchModal({
        open: true,
        preset: { ...preset, bankId: targetBankId },
      });
      return;
    }

    executeExpenseCreation({
      amount: preset.amount,
      description: preset.label,
      category: preset.category,
      date: new Date().toISOString().split('T')[0],
      member: session?.name?.split(' ')[0] || 'Família',
      paymentMethod: preset.paymentMethod,
      bankId: targetBankId,
    });
  };

  const handleSavePreset = (presetPayload) => {
    if (presetPayload.id) {
      setData((prev) => ({
        ...prev,
        isSample: false,
        quickPresets: prev.quickPresets.map((p) =>
          p.id === presetPayload.id ? { ...p, ...presetPayload } : p
        ),
      }));
      showToast(`Atalho "${presetPayload.label}" atualizado!`);
    } else {
      setData((prev) => ({
        ...prev,
        isSample: false,
        quickPresets: [...prev.quickPresets, { ...presetPayload, id: `qp-${Date.now()}` }],
      }));
      showToast(`Atalho "${presetPayload.label}" criado!`);
    }
    setPresetModal({ open: false, preset: null });
  };

  const handleDeletePreset = (presetId) => {
    setData((prev) => ({
      ...prev,
      quickPresets: prev.quickPresets.filter((p) => p.id !== presetId),
    }));
    setPresetModal({ open: false, preset: null });
    showToast('Atalho removido.');
  };

  const handleDeleteTransaction = (tx) => {
    setConfirmDialog({
      open: true,
      title: 'Excluir Lançamento?',
      message: `Deseja remover "${tx.description}" (${formatBRL(tx.amount)})? O saldo ou fatura do banco será estornado automaticamente.`,
      onConfirm: () => {
        const updatedBanks = data.banks.map((bank) => {
          if (bank.id !== tx.bankId) return bank;
          if (tx.type === 'income') {
            return { ...bank, balance: Number((bank.balance - tx.amount).toFixed(2)) };
          }
          if (tx.paymentMethod === 'credito') {
            return {
              ...bank,
              currentInvoice: Math.max(0, Number((bank.currentInvoice - tx.amount).toFixed(2))),
            };
          } else {
            return {
              ...bank,
              balance: Number((bank.balance + tx.amount).toFixed(2)),
            };
          }
        });

        setData((prev) => ({
          ...prev,
          banks: updatedBanks,
          transactions: prev.transactions.filter((t) => t.id !== tx.id),
        }));
        setConfirmDialog({ open: false });
        showToast('Lançamento excluído e valor estornado.');
      },
    });
  };

  const handleSaveBank = (bankPayload) => {
    if (bankPayload.id) {
      setData((prev) => ({
        ...prev,
        isSample: false,
        banks: prev.banks.map((b) => (b.id === bankPayload.id ? { ...b, ...bankPayload } : b)),
      }));
      showToast(`Banco ${bankPayload.name} atualizado!`);
    } else {
      const newBank = {
        ...bankPayload,
        id: `bank-${Date.now()}`,
      };
      setData((prev) => ({
        ...prev,
        isSample: false,
        banks: [...prev.banks, newBank],
      }));
      showToast(`Banco ${bankPayload.name} adicionado!`);
    }
    setBankModal({ open: false, bank: null });
  };

  const handleDeleteBank = (bank) => {
    if (data.banks.length <= 1) {
      showToast('Você precisa manter pelo menos 1 banco cadastrado.', 'error');
      return;
    }
    setConfirmDialog({
      open: true,
      title: `Remover ${bank.name}?`,
      message: 'Isso excluirá esta conta bancária e seus dados de cartão. Lançamentos antigos ficarão sem vínculo.',
      onConfirm: () => {
        setData((prev) => ({
          ...prev,
          banks: prev.banks.filter((b) => b.id !== bank.id),
        }));
        setConfirmDialog({ open: false });
        showToast(`Banco ${bank.name} removido.`);
      },
    });
  };

  const handleAddDeposit = (bankId, amount, description) => {
    const val = parseFloat(String(amount).replace(',', '.'));
    if (!val || val <= 0) {
      showToast('Digite um valor válido para depósito.', 'error');
      return;
    }

    const newTx = {
      id: `tx-${Date.now()}`,
      type: 'income',
      amount: val,
      description: description.trim() || 'Depósito / Entrada',
      category: 'outros',
      date: new Date().toISOString().split('T')[0],
      member: session?.name?.split(' ')[0] || 'Família',
      paymentMethod: 'pix',
      bankId,
    };

    setData((prev) => ({
      ...prev,
      isSample: false,
      banks: prev.banks.map((b) =>
        b.id === bankId ? { ...b, balance: Number((b.balance + val).toFixed(2)) } : b
      ),
      transactions: [newTx, ...prev.transactions],
    }));

    setDepositModal({ open: false, bank: null });
    showToast(`Entrada de ${formatBRL(val)} adicionada ao saldo!`);
  };

  const handlePayInvoice = (bank) => {
    if (bank.currentInvoice <= 0) {
      showToast('Esta fatura já está zerada!', 'info');
      return;
    }

    setConfirmDialog({
      open: true,
      title: `Pagar Fatura ${bank.name}?`,
      message: `O valor de ${formatBRL(bank.currentInvoice)} será descontado do seu saldo disponível no ${bank.name} (${formatBRL(bank.balance)}) e a fatura atual será zerada.`,
      onConfirm: () => {
        const invoiceValue = bank.currentInvoice;
        const newTx = {
          id: `tx-${Date.now()}`,
          type: 'expense',
          amount: invoiceValue,
          description: `Pagamento Fatura Cartão ${bank.name}`,
          category: 'outros',
          date: new Date().toISOString().split('T')[0],
          member: session?.name?.split(' ')[0] || 'Família',
          paymentMethod: 'debito',
          bankId: bank.id,
        };

        setData((prev) => ({
          ...prev,
          banks: prev.banks.map((b) =>
            b.id === bank.id
              ? {
                  ...b,
                  balance: Number((b.balance - invoiceValue).toFixed(2)),
                  currentInvoice: 0,
                }
              : b
          ),
          transactions: [newTx, ...prev.transactions],
        }));

        setConfirmDialog({ open: false });
        showToast(`Fatura de ${formatBRL(invoiceValue)} paga com sucesso!`);
      },
    });
  };

  const handleSaveSubscription = (subPayload) => {
    if (subPayload.id) {
      setData((prev) => ({
        ...prev,
        isSample: false,
        subscriptions: prev.subscriptions.map((s) => (s.id === subPayload.id ? { ...s, ...subPayload } : s)),
      }));
      showToast(`Assinatura ${subPayload.name} atualizada!`);
    } else {
      const newSub = {
        ...subPayload,
        id: `sub-${Date.now()}`,
      };
      setData((prev) => ({
        ...prev,
        isSample: false,
        subscriptions: [...prev.subscriptions, newSub],
      }));
      showToast(`Assinatura ${subPayload.name} cadastrada!`);
    }
    setSubModal({ open: false, sub: null });
  };

  const handleDeleteSubscription = (sub) => {
    setConfirmDialog({
      open: true,
      title: `Excluir ${sub.name}?`,
      message: 'A assinatura será removida da lista de custos fixos mensais.',
      onConfirm: () => {
        setData((prev) => ({
          ...prev,
          subscriptions: prev.subscriptions.filter((s) => s.id !== sub.id),
        }));
        setConfirmDialog({ open: false });
        showToast('Assinatura removida.');
      },
    });
  };

  const handleLaunchSubscriptionNow = (sub) => {
    const bank = data.banks.find((b) => b.id === sub.bankId) || data.banks[0];
    if (!bank) {
      showToast('Cadastre um banco antes de lançar a assinatura.', 'error');
      return;
    }

    const newTx = {
      id: `tx-${Date.now()}`,
      type: 'expense',
      amount: Number(sub.amount),
      description: `Assinatura: ${sub.name}`,
      category: sub.category || 'outros',
      date: new Date().toISOString().split('T')[0],
      member: session?.name?.split(' ')[0] || 'Família',
      paymentMethod: sub.paymentMethod,
      bankId: bank.id,
    };

    const updatedBanks = data.banks.map((b) => {
      if (b.id !== bank.id) return b;
      if (sub.paymentMethod === 'credito') {
        return { ...b, currentInvoice: Number((b.currentInvoice + Number(sub.amount)).toFixed(2)) };
      } else {
        return { ...b, balance: Number((b.balance - Number(sub.amount)).toFixed(2)) };
      }
    });

    setData((prev) => ({
      ...prev,
      banks: updatedBanks,
      transactions: [newTx, ...prev.transactions],
    }));

    showToast(`${sub.name} (${formatBRL(sub.amount)}) lançado no ${bank.name}!`);
  };

  const handleClearSampleData = () => {
    setConfirmDialog({
      open: true,
      title: 'Limpar Dados de Exemplo?',
      message: 'Isso zerará os lançamentos e assinaturas de exemplo e manterá apenas uma conta inicial zerada para você começar do zero.',
      onConfirm: () => {
        setData({
          isSample: false,
          banks: [
            {
              id: 'bank-init',
              name: 'Conta Principal',
              balance: 0,
              creditLimit: 2000,
              currentInvoice: 0,
              dueDay: 10,
              theme: 'nubank',
            },
          ],
          transactions: [],
          subscriptions: [],
          quickPresets: INITIAL_SAMPLE_DATA.quickPresets,
        });
        setConfirmDialog({ open: false });
        showToast('Tudo limpo! Pronto para os dados da sua família.');
      },
    });
  };

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financas-familia-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Backup JSON exportado com sucesso!');
  };

  const handleImportJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.banks && Array.isArray(parsed.banks)) {
          setData({ ...parsed, isSample: false });
          showToast('Dados importados e restaurados com sucesso!');
        } else {
          showToast('Arquivo de backup inválido.', 'error');
        }
      } catch {
        showToast('Erro ao ler o arquivo JSON.', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex justify-center font-sans selection:bg-emerald-200">
      <div className="w-full max-w-md bg-slate-50 min-h-screen shadow-2xl relative flex flex-col pb-24 selection:bg-purple-200">
        
        {toast && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm animate-bounce">
            <div
              className={`px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-white text-sm font-medium ${
                toast.type === 'error'
                  ? 'bg-rose-600'
                  : toast.type === 'info'
                  ? 'bg-slate-800'
                  : 'bg-purple-800 border border-amber-400/40'
              }`}
            >
              {toast.type === 'error' ? (
                <AlertCircle className="w-5 h-5 shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
              )}
              <span className="leading-snug">{toast.message}</span>
            </div>
          </div>
        )}

        {/* HEADER SUPERIOR */}
        <header className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-950 text-white pt-4 pb-5 px-5 rounded-b-3xl shadow-lg border-b-2 border-amber-400/60">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-amber-300 text-[10px] font-black uppercase tracking-wider">
                  Usuário: {session.name}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </div>
              <h1 className="text-lg font-black tracking-tight flex items-center gap-2 mt-0.5">
                <Wallet className="w-5 h-5 text-amber-400" />
                Finanças em Família
              </h1>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={onInstallClick}
                title="Baixar / Instalar aplicativo no celular"
                className="px-2.5 py-1.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-purple-950 font-black text-[11px] rounded-xl shadow active:scale-95 transition flex items-center gap-1"
              >
                <Smartphone className="w-3.5 h-3.5" />
                App
              </button>
              <button
                onClick={handleExportJSON}
                title="Exportar Backup"
                className="p-2 bg-purple-950/60 hover:bg-purple-950 border border-purple-700/50 active:scale-95 rounded-xl transition"
              >
                <Download className="w-3.5 h-3.5 text-amber-200" />
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                title="Importar Backup"
                className="p-2 bg-purple-950/60 hover:bg-purple-950 border border-purple-700/50 active:scale-95 rounded-xl transition"
              >
                <Upload className="w-3.5 h-3.5 text-amber-200" />
              </button>
              <button
                onClick={onLogout}
                title="Sair da conta"
                className="p-2 bg-rose-950/60 hover:bg-rose-900 border border-rose-700/50 active:scale-95 rounded-xl transition text-rose-300"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                className="hidden"
              />
            </div>
          </div>

          {data.isSample && (
            <div className="mt-3 bg-purple-950/70 border border-amber-400/40 rounded-2xl p-2.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs text-purple-100">
                <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Usando dados de exemplo para teste.</span>
              </div>
              <button
                onClick={handleClearSampleData}
                className="px-2.5 py-1 bg-amber-400 text-purple-950 text-xs font-black rounded-xl shadow-sm active:scale-95 shrink-0"
              >
                Limpar exemplos
              </button>
            </div>
          )}
        </header>

        {/* CONTEÚDO PRINCIPAL */}
        <main className="flex-1 px-4 pt-4 space-y-5">
          {activeTab === 'resumo' && (
            <>
              {/* ATALHOS 1-TOQUE */}
              <div className="bg-white rounded-3xl p-4 shadow-sm border border-purple-100/80">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="p-1 bg-amber-100 text-amber-600 rounded-lg">
                      <Zap className="w-3.5 h-3.5 fill-amber-500" />
                    </span>
                    <h2 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">
                      Lançamento 1-Toque
                    </h2>
                  </div>
                  <button
                    onClick={() => setPresetModal({ open: true, preset: null })}
                    className="text-[11px] font-bold text-purple-700 hover:underline flex items-center gap-0.5"
                  >
                    <Plus className="w-3 h-3" /> Criar Atalho
                  </button>
                </div>

                <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
                  <button
                    onClick={() => setQuickLaunchModal({ open: true, preset: null })}
                    className="min-w-[105px] bg-gradient-to-br from-purple-900 to-purple-950 text-white rounded-2xl p-3 flex flex-col justify-between items-start shadow-sm active:scale-95 transition shrink-0 border border-amber-400/30"
                  >
                    <div className="w-7 h-7 rounded-xl bg-amber-400 text-purple-950 flex items-center justify-center">
                      <Zap className="w-4 h-4 fill-purple-950" />
                    </div>
                    <div className="mt-2 text-left">
                      <p className="text-xs font-extrabold leading-tight">Digitar Valor</p>
                      <p className="text-[10px] text-amber-200/80 mt-0.5">Teclado rápido</p>
                    </div>
                  </button>

                  {data.quickPresets.map((preset) => {
                    const cat = getCategoryConfig(preset.category);
                    const CatIcon = cat.icon;
                    const bank = data.banks.find((b) => b.id === preset.bankId);
                    return (
                      <div
                        key={preset.id}
                        className="min-w-[125px] bg-slate-50 hover:bg-purple-50/60 border border-slate-200/80 rounded-2xl p-3 flex flex-col justify-between relative group shrink-0"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className={`p-1.5 rounded-xl ${cat.bgLight} ${cat.text}`}>
                            <CatIcon className="w-3.5 h-3.5" />
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setPresetModal({ open: true, preset });
                            }}
                            className="p-1 text-slate-300 hover:text-slate-600"
                            title="Editar atalho"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => handleOneTapPreset(preset)}
                          className="mt-2 text-left w-full active:scale-95 transition"
                        >
                          <p className="text-xs font-extrabold text-slate-800 truncate">
                            {preset.label}
                          </p>
                          <p className="text-xs font-black text-purple-700 mt-0.5">
                            {preset.amount > 0 ? formatBRL(preset.amount) : 'Valor livre'}
                          </p>
                          <p className="text-[9px] text-slate-400 font-semibold truncate mt-0.5">
                            {bank?.name || 'Banco'} • {getPaymentConfig(preset.paymentMethod).label}
                          </p>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CARD DE SALDO TOTAL */}
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-purple-100/80">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Saldo Total em Contas
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setDepositModal({ open: true, bank: data.banks[0] || null })}
                      className="text-[11px] font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300/60 px-2.5 py-0.5 rounded-full flex items-center gap-1 active:scale-95 transition"
                    >
                      <Plus className="w-3 h-3" /> Receita
                    </button>
                    <span className="text-xs font-medium text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-full">
                      {data.banks.length} {data.banks.length === 1 ? 'banco' : 'bancos'}
                    </span>
                  </div>
                </div>
                <div
                  className={`text-3xl font-extrabold tracking-tight ${
                    totals.totalBalance < 0 ? 'text-rose-600' : 'text-slate-900'
                  }`}
                >
                  {formatBRL(totals.totalBalance)}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-700">
                      Balanço do Mês (Recebido vs Gastos)
                    </span>
                    <span
                      className={`text-xs font-extrabold px-2 py-0.5 rounded-lg ${
                        totals.monthlyNetBalance >= 0
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {totals.monthlyNetBalance >= 0 ? 'Superávit: ' : 'Déficit: '}
                      {formatBRL(totals.monthlyNetBalance)}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="bg-amber-50/80 border border-amber-200/70 p-2.5 rounded-2xl">
                      <div className="flex items-center gap-1 text-amber-800 text-[11px] font-bold">
                        <ArrowDownLeft className="w-3.5 h-3.5" />
                        Recebido no Mês
                      </div>
                      <p className="text-sm font-extrabold text-amber-950 mt-0.5">
                        {formatBRL(totals.totalMonthlyIncome)}
                      </p>
                    </div>

                    <div className="bg-rose-50/70 border border-rose-100 p-2.5 rounded-2xl">
                      <div className="flex items-center gap-1 text-rose-700 text-[11px] font-bold">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        Gastos do Mês
                      </div>
                      <p className="text-sm font-extrabold text-rose-950 mt-0.5">
                        {formatBRL(totals.totalMonthlySpent)}
                      </p>
                    </div>
                  </div>

                  {totals.totalMonthlyIncome > 0 && (
                    <div>
                      <div className="flex justify-between text-[10px] font-semibold text-slate-500 mb-1">
                        <span>Comprometimento da renda mensal</span>
                        <span>
                          {Math.min(
                            100,
                            Math.round((totals.totalMonthlySpent / totals.totalMonthlyIncome) * 100)
                          )}
                          % gasto
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            totals.totalMonthlySpent > totals.totalMonthlyIncome
                              ? 'bg-rose-500'
                              : totals.totalMonthlySpent > totals.totalMonthlyIncome * 0.8
                              ? 'bg-amber-500'
                              : 'bg-purple-700'
                          }`}
                          style={{
                            width: `${Math.min(
                              100,
                              Math.round((totals.totalMonthlySpent / totals.totalMonthlyIncome) * 100)
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-100">
                  <div className="bg-purple-50/80 p-3 rounded-2xl">
                    <div className="flex items-center gap-1.5 text-purple-800 text-xs font-semibold">
                      <CreditCard className="w-3.5 h-3.5" />
                      Fatura Atual
                    </div>
                    <p className="text-base font-bold text-purple-950 mt-0.5">
                      {formatBRL(totals.totalInvoices)}
                    </p>
                    <p className="text-[10px] text-purple-700/80 font-medium mt-0.5">
                      {totals.projectedInvoiceRatio}% do limite total
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-900 to-purple-950 text-white p-3 rounded-2xl border border-amber-400/40">
                    <div className="flex items-center gap-1.5 text-amber-300 text-xs font-semibold">
                      <TrendingUp className="w-3.5 h-3.5" />
                      Projeção Fatura
                    </div>
                    <p className="text-base font-extrabold text-white mt-0.5">
                      {formatBRL(totals.projectedCreditInvoice)}
                    </p>
                    <p className="text-[10px] text-amber-200/80 font-medium mt-0.5">
                      {totals.pendingCreditSubsAmount > 0
                        ? `+${formatBRL(totals.pendingCreditSubsAmount)} assinaturas`
                        : 'Assinaturas inclusas'}
                    </p>
                  </div>
                </div>
              </div>

              {/* CARROSSEL DE BANCOS */}
              <div>
                <div className="flex items-center justify-between mb-2.5 px-1">
                  <h2 className="text-sm font-bold text-slate-700">Meus Bancos e Cartões</h2>
                  <button
                    onClick={() => setActiveTab('bancos')}
                    className="text-xs font-bold text-purple-700 hover:underline"
                  >
                    Gerenciar
                  </button>
                </div>

                <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory no-scrollbar">
                  {data.banks.map((bank) => {
                    const theme = getThemeConfig(bank.theme);
                    const limitPercent =
                      bank.creditLimit > 0
                        ? Math.min(100, Math.round((bank.currentInvoice / bank.creditLimit) * 100))
                        : 0;

                    return (
                      <div
                        key={bank.id}
                        className={`min-w-[250px] snap-start bg-gradient-to-br ${theme.gradient} text-white rounded-3xl p-4 shadow-md flex flex-col justify-between`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-base tracking-tight">{bank.name}</span>
                          <Building2 className="w-4 h-4 text-white/70" />
                        </div>

                        <div className="my-3">
                          <p className="text-[11px] text-white/75 uppercase">Saldo Disponível</p>
                          <p className="text-xl font-extrabold">{formatBRL(bank.balance)}</p>
                        </div>

                        <div className="bg-black/20 rounded-2xl p-2.5 backdrop-blur-sm">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-white/80">Fatura Atual</span>
                            <span className="font-bold">{formatBRL(bank.currentInvoice)}</span>
                          </div>
                          <div className="w-full bg-white/20 h-1.5 rounded-full mt-1.5 overflow-hidden">
                            <div
                              className="bg-white h-full rounded-full transition-all"
                              style={{ width: `${limitPercent}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* GASTOS POR CATEGORIA */}
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-purple-100/80">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-bold text-slate-800">Gastos do Mês por Categoria</h2>
                  <button
                    onClick={() => setActiveTab('graficos')}
                    className="text-xs font-bold text-purple-700 flex items-center gap-1 hover:underline"
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    Ver Gráficos
                  </button>
                </div>

                {totals.byCategory.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4">
                    Nenhum gasto registrado neste mês ainda.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {totals.byCategory.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <div key={cat.id}>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <div className="flex items-center gap-2 font-semibold text-slate-700">
                              <span className={`p-1.5 rounded-lg ${cat.bgLight} ${cat.text}`}>
                                <Icon className="w-3.5 h-3.5" />
                              </span>
                              <span>{cat.label}</span>
                            </div>
                            <div className="text-right">
                              <span className="font-bold text-slate-800">{formatBRL(cat.total)}</span>
                              <span className="text-slate-400 ml-1.5">({cat.percentage}%)</span>
                            </div>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div
                              className={`${cat.color} h-full rounded-full transition-all duration-500`}
                              style={{ width: `${cat.percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* ÚLTIMOS LANÇAMENTOS */}
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-purple-100/80">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-bold text-slate-800">Últimos Lançamentos</h2>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {filteredTransactions.length} {filteredTransactions.length === 1 ? 'item' : 'itens'}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Buscar compra no histórico..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl pl-8 pr-3 py-2.5 font-medium focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={filterBank}
                      onChange={(e) => setFilterBank(e.target.value)}
                      className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl px-3 py-2.5 font-medium focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      <option value="all">Todos os Bancos</option>
                      {data.banks.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name}
                        </option>
                      ))}
                    </select>

                    <select
                      value={filterPayment}
                      onChange={(e) => setFilterPayment(e.target.value)}
                      className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl px-3 py-2.5 font-medium focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      <option value="all">Todas as Formas</option>
                      {PAYMENT_METHODS.map((pm) => (
                        <option key={pm.id} value={pm.id}>
                          {pm.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {filteredTransactions.length === 0 ? (
                  <div className="text-center py-6 text-slate-400 text-xs">
                    Nenhum lançamento encontrado para este filtro.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {filteredTransactions.map((tx) => {
                      const cat = getCategoryConfig(tx.category);
                      const CatIcon = cat.icon;
                      const bank = data.banks.find((b) => b.id === tx.bankId);
                      const payConfig = getPaymentConfig(tx.paymentMethod);
                      const isIncome = tx.type === 'income';

                      return (
                        <div
                          key={tx.id}
                          className="py-3 flex items-center justify-between gap-3 group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                                isIncome
                                  ? 'bg-amber-100 text-amber-700'
                                  : `${cat.bgLight} ${cat.text}`
                              }`}
                            >
                              {isIncome ? (
                                <ArrowDownLeft className="w-5 h-5" />
                              ) : (
                                <CatIcon className="w-5 h-5" />
                              )}
                            </div>

                            <div className="min-w-0">
                              <p className="text-sm font-bold text-slate-800 truncate">
                                {tx.description}
                              </p>
                              <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                                <span className="text-[11px] font-semibold text-slate-500">
                                  {bank ? bank.name : 'Banco removido'}
                                </span>
                                <span className="text-slate-300">•</span>
                                <span
                                  className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${payConfig.badge}`}
                                >
                                  {payConfig.label}
                                </span>
                                {tx.member && (
                                  <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-medium">
                                    {tx.member}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="text-right shrink-0 flex items-center gap-2">
                            <div>
                              <p
                                className={`text-sm font-extrabold ${
                                  isIncome ? 'text-amber-600' : 'text-slate-900'
                                }`}
                              >
                                {isIncome ? '+' : '-'} {formatBRL(tx.amount)}
                              </p>
                              <p className="text-[10px] text-slate-400">
                                {formatDateBR(tx.date)}
                              </p>
                            </div>
                            <button
                              onClick={() => handleDeleteTransaction(tx)}
                              title="Excluir lançamento"
                              className="p-2 text-slate-300 hover:text-rose-600 active:scale-90 transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'lancar' && (
            <form
              onSubmit={handleAddExpense}
              className="bg-white rounded-3xl p-5 shadow-sm border border-purple-100 space-y-5"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-slate-800">Registrar Novo Gasto</h2>
                <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full">
                  Rápido
                </span>
              </div>

              <div className="bg-purple-50/40 border-2 border-purple-600/40 focus-within:border-purple-700 rounded-2xl p-4 transition">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Valor da Compra (R$)
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-extrabold text-purple-700">R$</span>
                  <input
                    type="number"
                    step="0.01"
                    inputMode="decimal"
                    placeholder="0,00"
                    required
                    value={expenseForm.amount}
                    onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                    className="w-full bg-transparent text-3xl font-extrabold text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
                  O que foi comprado?
                </label>
                <input
                  type="text"
                  placeholder="Ex: Supermercado, Farmácia, Gasolina..."
                  required
                  value={expenseForm.description}
                  onChange={(e) =>
                    setExpenseForm({ ...expenseForm, description: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
                  Forma de Pagamento
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {PAYMENT_METHODS.map((pm) => {
                    const selected = expenseForm.paymentMethod === pm.id;
                    return (
                      <button
                        type="button"
                        key={pm.id}
                        onClick={() =>
                          setExpenseForm({ ...expenseForm, paymentMethod: pm.id })
                        }
                        className={`py-3.5 px-3 rounded-2xl border-2 text-sm font-bold transition flex items-center justify-center gap-2 active:scale-95 ${
                          selected
                            ? 'border-purple-700 bg-purple-50 text-purple-900 shadow-sm'
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {pm.id === 'credito' && <CreditCard className="w-4 h-4" />}
                        {pm.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
                  Qual Banco / Cartão?
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {data.banks.map((bank) => {
                    const theme = getThemeConfig(bank.theme);
                    const selected = expenseForm.bankId === bank.id;
                    return (
                      <button
                        type="button"
                        key={bank.id}
                        onClick={() => setExpenseForm({ ...expenseForm, bankId: bank.id })}
                        className={`p-3 rounded-2xl border-2 text-left transition active:scale-95 ${
                          selected
                            ? 'border-purple-700 bg-purple-50/60 shadow-sm'
                            : 'border-slate-200 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-3 h-3 rounded-full bg-gradient-to-br ${theme.gradient}`}
                          />
                          <span className="text-sm font-bold text-slate-800 truncate">
                            {bank.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">
                          {expenseForm.paymentMethod === 'credito'
                            ? `Fatura: ${formatBRL(bank.currentInvoice)}`
                            : `Saldo: ${formatBRL(bank.balance)}`}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
                  Categoria
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const selected = expenseForm.category === cat.id;
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => setExpenseForm({ ...expenseForm, category: cat.id })}
                        className={`p-2.5 rounded-2xl border flex flex-col items-center justify-center gap-1 transition active:scale-95 ${
                          selected
                            ? 'border-purple-700 bg-purple-50 text-purple-800 font-bold'
                            : 'border-slate-200 bg-white text-slate-500'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[10px] truncate w-full text-center">
                          {cat.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
                    Data
                  </label>
                  <input
                    type="date"
                    value={expenseForm.date}
                    onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-3 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
                    Quem gastou?
                  </label>
                  <select
                    value={expenseForm.member}
                    onChange={(e) => setExpenseForm({ ...expenseForm, member: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-3 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    {FAMILY_MEMBERS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-800 to-purple-950 hover:from-purple-700 hover:to-purple-900 active:scale-[0.98] text-amber-300 font-extrabold py-4 rounded-2xl shadow-lg shadow-purple-900/25 transition flex items-center justify-center gap-2 text-base border border-amber-400/30"
              >
                <CheckCircle2 className="w-5 h-5" />
                Salvar Gasto
              </button>
            </form>
          )}

          {activeTab === 'graficos' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-800">Gráficos de Utilização</h2>
                  <p className="text-xs text-slate-500">
                    Análise mensal, categorias, bancos e projeção
                  </p>
                </div>
                <span className="bg-purple-100 text-purple-900 text-xs font-extrabold px-3 py-1.5 rounded-2xl">
                  {formatBRL(totals.totalMonthlySpent)}
                </span>
              </div>

              <div className="bg-white rounded-3xl p-5 shadow-sm border border-purple-100/80">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-purple-700" />
                    <h3 className="text-sm font-extrabold text-slate-800">
                      Balanço Mensal (Recebido vs Gastos)
                    </h3>
                  </div>
                </div>

                <div className="h-60 w-full mt-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={totals.monthlyComparison}
                      margin={{ top: 10, right: 8, left: -15, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis
                        dataKey="mes"
                        tick={{ fontSize: 11, fontWeight: 700, fill: '#475569' }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 10, fill: '#94a3b8' }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        formatter={(value) => formatBRL(value)}
                        contentStyle={{
                          borderRadius: '14px',
                          border: 'none',
                          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                          fontSize: '12px',
                        }}
                      />
                      <Bar
                        dataKey="recebido"
                        name="Recebido"
                        fill="#f59e0b"
                        radius={[6, 6, 0, 0]}
                      />
                      <Bar
                        dataKey="gastos"
                        name="Gastos Totais"
                        fill="#f43f5e"
                        radius={[6, 6, 0, 0]}
                      />
                      <Bar
                        dataKey="credito"
                        name="No Crédito"
                        fill="#7e22ce"
                        radius={[6, 6, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    Recebido
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    Gastos Totais
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-700" />
                    Crédito
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-5 shadow-sm border border-purple-100/80">
                <div className="flex items-center gap-2 mb-2">
                  <PieChartIcon className="w-4 h-4 text-purple-700" />
                  <h3 className="text-sm font-extrabold text-slate-800">
                    Distribuição por Categoria (Mês)
                  </h3>
                </div>

                {totals.byCategory.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-8">
                    Registre gastos neste mês para visualizar o gráfico.
                  </p>
                ) : (
                  <>
                    <div className="h-56 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={totals.byCategory}
                            dataKey="total"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={52}
                            outerRadius={82}
                            paddingAngle={3}
                          >
                            {totals.byCategory.map((entry) => (
                              <Cell key={entry.id} fill={entry.hex} stroke="none" />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value) => formatBRL(value)}
                            contentStyle={{
                              borderRadius: '14px',
                              border: 'none',
                              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                              fontSize: '12px',
                              fontWeight: 'bold',
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-slate-100">
                      {totals.byCategory.map((cat) => (
                        <div
                          key={cat.id}
                          className="flex items-center justify-between bg-slate-50 px-2.5 py-2 rounded-xl text-xs"
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: cat.hex }}
                            />
                            <span className="font-semibold text-slate-700 truncate">
                              {cat.name}
                            </span>
                          </div>
                          <span className="font-extrabold text-slate-900 shrink-0 ml-1">
                            {cat.percentage}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {activeTab === 'bancos' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-800">Bancos e Cartões</h2>
                  <p className="text-xs text-slate-500">
                    Gerencie saldos disponíveis e faturas abertas
                  </p>
                </div>
                <button
                  onClick={() => setBankModal({ open: true, bank: null })}
                  className="bg-purple-800 text-amber-300 px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  Novo Banco
                </button>
              </div>

              {data.banks.map((bank) => {
                const theme = getThemeConfig(bank.theme);
                const limitUsage =
                  bank.creditLimit > 0
                    ? Math.min(100, Math.round((bank.currentInvoice / bank.creditLimit) * 100))
                    : 0;

                return (
                  <div
                    key={bank.id}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100"
                  >
                    <div className={`bg-gradient-to-r ${theme.gradient} p-4 text-white`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Building2 className="w-5 h-5 text-white/80" />
                          <h3 className="font-extrabold text-lg">{bank.name}</h3>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setBankModal({ open: true, bank })}
                            className="p-2 bg-white/15 hover:bg-white/25 rounded-xl transition"
                            title="Editar banco"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBank(bank)}
                            className="p-2 bg-white/15 hover:bg-rose-500/80 rounded-xl transition"
                            title="Remover banco"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 flex items-end justify-between">
                        <div>
                          <p className="text-xs text-white/75">Saldo em Conta</p>
                          <p className="text-2xl font-extrabold">{formatBRL(bank.balance)}</p>
                        </div>
                        <button
                          onClick={() => setDepositModal({ open: true, bank })}
                          className="bg-amber-400 text-purple-950 px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1 shadow active:scale-95"
                        >
                          <Plus className="w-3.5 h-3.5 text-purple-950" />
                          Depositar
                        </button>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                            <CreditCard className="w-3.5 h-3.5 text-purple-600" />
                            Fatura Atual (Vence dia {bank.dueDay || 10})
                          </span>
                          <p className="text-lg font-extrabold text-purple-900 mt-0.5">
                            {formatBRL(bank.currentInvoice)}
                          </p>
                        </div>

                        <button
                          onClick={() => handlePayInvoice(bank)}
                          disabled={bank.currentInvoice <= 0}
                          className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition active:scale-95 ${
                            bank.currentInvoice > 0
                              ? 'bg-purple-600 text-white shadow-sm hover:bg-purple-700'
                              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          Pagar Fatura
                        </button>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                          <span>Limite utilizado: {limitUsage}%</span>
                          <span>Limite total: {formatBRL(bank.creditLimit)}</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              limitUsage > 85 ? 'bg-rose-500' : 'bg-purple-600'
                            }`}
                            style={{ width: `${limitUsage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'assinaturas' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-800">Assinaturas Mensais</h2>
                  <p className="text-xs text-slate-500">
                    Streaming, internet, academia e serviços fixos
                  </p>
                </div>
                <button
                  onClick={() => setSubModal({ open: true, sub: null })}
                  className="bg-purple-800 text-amber-300 px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  Nova
                </button>
              </div>

              <div className="bg-gradient-to-r from-purple-900 to-purple-950 text-white rounded-3xl p-5 shadow-md flex items-center justify-between border border-amber-400/30">
                <div>
                  <p className="text-xs text-amber-300 uppercase font-semibold">
                    Custo Fixo Mensal Total
                  </p>
                  <p className="text-2xl font-extrabold mt-1">
                    {formatBRL(totals.totalSubscriptions)}
                  </p>
                </div>
                <div className="bg-amber-400/15 p-3 rounded-2xl">
                  <Repeat className="w-6 h-6 text-amber-400" />
                </div>
              </div>

              {data.subscriptions.length === 0 ? (
                <div className="bg-white rounded-3xl p-8 text-center text-slate-400 text-xs border border-slate-100">
                  Nenhuma assinatura cadastrada. Clique em "+ Nova" para adicionar.
                </div>
              ) : (
                <div className="space-y-3">
                  {data.subscriptions.map((sub) => {
                    const bank = data.banks.find((b) => b.id === sub.bankId);
                    const payConfig = getPaymentConfig(sub.paymentMethod);

                    return (
                      <div
                        key={sub.id}
                        className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col gap-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-extrabold text-base text-slate-800">
                                {sub.name}
                              </h3>
                              <span className="text-[11px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-lg">
                                Dia {sub.billingDay}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs font-semibold text-slate-500">
                                {bank ? bank.name : 'Sem banco'}
                              </span>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded border ${payConfig.badge}`}
                              >
                                {payConfig.label}
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-base font-extrabold text-slate-900">
                              {formatBRL(sub.amount)}
                            </p>
                            <span className="text-[10px] text-slate-400">/mês</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
                          <button
                            onClick={() => handleLaunchSubscriptionNow(sub)}
                            className="bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 active:scale-95"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            Lançar no mês agora
                          </button>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setSubModal({ open: true, sub })}
                              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteSubscription(sub)}
                              className="p-2 text-slate-400 hover:text-rose-600 rounded-xl"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* NOTA DE RODAPÉ OBRIGATÓRIA NO CANTO INFERIOR */}
          <div className="text-center pt-6 pb-4">
            <p className="text-[11px] text-slate-400 font-semibold flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{COPYRIGHT_NOTE}</span>
            </p>
          </div>
        </main>

        {/* BARRA INFERIOR FIXA */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-purple-100 px-1.5 py-2 flex items-center justify-around z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <button
            onClick={() => setActiveTab('resumo')}
            className={`flex flex-col items-center justify-center py-1.5 px-2.5 rounded-2xl transition ${
              activeTab === 'resumo'
                ? 'text-purple-800 font-bold'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] mt-1">Início</span>
          </button>

          <button
            onClick={() => setActiveTab('graficos')}
            className={`flex flex-col items-center justify-center py-1.5 px-2.5 rounded-2xl transition ${
              activeTab === 'graficos'
                ? 'text-purple-800 font-bold'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-[10px] mt-1">Gráficos</span>
          </button>

          <button
            onClick={() => setQuickLaunchModal({ open: true, preset: null })}
            className="-mt-7 w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-purple-950 shadow-lg shadow-amber-500/35 ring-4 ring-white flex flex-col items-center justify-center transition active:scale-90"
            aria-label="Lançamento Rápido"
          >
            <Zap className="w-6 h-6 fill-purple-950" />
          </button>

          <button
            onClick={() => setActiveTab('bancos')}
            className={`flex flex-col items-center justify-center py-1.5 px-2.5 rounded-2xl transition ${
              activeTab === 'bancos'
                ? 'text-purple-800 font-bold'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span className="text-[10px] mt-1">Bancos</span>
          </button>

          <button
            onClick={() => setActiveTab('assinaturas')}
            className={`flex flex-col items-center justify-center py-1.5 px-2.5 rounded-2xl transition ${
              activeTab === 'assinaturas'
                ? 'text-purple-800 font-bold'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Repeat className="w-5 h-5" />
            <span className="text-[10px] mt-1">Fixos</span>
          </button>
        </nav>

        {quickLaunchModal.open && (
          <QuickLaunchKeypadModal
            banks={data.banks}
            initialPreset={quickLaunchModal.preset}
            recentDescriptions={totals.recentDescriptions}
            onClose={() => setQuickLaunchModal({ open: false, preset: null })}
            onOpenFullForm={() => {
              setQuickLaunchModal({ open: false, preset: null });
              setActiveTab('lancar');
            }}
            onConfirm={(payload) => {
              const ok = executeExpenseCreation(payload);
              if (ok) {
                setQuickLaunchModal({ open: false, preset: null });
              }
            }}
          />
        )}

        {presetModal.open && (
          <QuickPresetFormModal
            banks={data.banks}
            initialPreset={presetModal.preset}
            onClose={() => setPresetModal({ open: false, preset: null })}
            onSave={handleSavePreset}
            onDelete={handleDeletePreset}
          />
        )}

        {bankModal.open && (
          <BankFormModal
            initialBank={bankModal.bank}
            onClose={() => setBankModal({ open: false, bank: null })}
            onSave={handleSaveBank}
          />
        )}

        {depositModal.open && (
          <DepositFormModal
            banks={data.banks}
            initialBank={depositModal.bank}
            onClose={() => setDepositModal({ open: false, bank: null })}
            onSave={handleAddDeposit}
          />
        )}

        {subModal.open && (
          <SubscriptionFormModal
            banks={data.banks}
            initialSub={subModal.sub}
            onClose={() => setSubModal({ open: false, sub: null })}
            onSave={handleSaveSubscription}
          />
        )}

        {showInstallGuide && (
          <InstallGuideModal onClose={() => setShowInstallGuide(false)} />
        )}

        {confirmDialog.open && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4">
              <h3 className="text-lg font-extrabold text-slate-900">{confirmDialog.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{confirmDialog.message}</p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setConfirmDialog({ open: false })}
                  className="flex-1 py-3 rounded-2xl bg-slate-100 text-slate-700 font-bold text-sm active:scale-95"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDialog.onConfirm}
                  className="flex-1 py-3 rounded-2xl bg-purple-800 text-amber-300 font-bold text-sm active:scale-95 shadow-md"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// SUBCOMPONENTES DE MODAIS
// ============================================================================

function BankFormModal({ initialBank, onClose, onSave }) {
  const [name, setName] = useState(initialBank?.name || '');
  const [balance, setBalance] = useState(initialBank?.balance ?? '');
  const [creditLimit, setCreditLimit] = useState(initialBank?.creditLimit ?? 3000);
  const [currentInvoice, setCurrentInvoice] = useState(initialBank?.currentInvoice ?? 0);
  const [dueDay, setDueDay] = useState(initialBank?.dueDay ?? 10);
  const [theme, setTheme] = useState(initialBank?.theme || 'nubank');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({
      id: initialBank?.id,
      name: name.trim(),
      balance: parseFloat(String(balance).replace(',', '.')) || 0,
      creditLimit: parseFloat(String(creditLimit).replace(',', '.')) || 0,
      currentInvoice: parseFloat(String(currentInvoice).replace(',', '.')) || 0,
      dueDay: parseInt(dueDay, 10) || 10,
      theme,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-slate-900">
            {initialBank ? 'Editar Banco / Cartão' : 'Adicionar Banco / Cartão'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-2 bg-slate-100 rounded-full text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
            Nome do Banco
          </label>
          <input
            type="text"
            required
            placeholder="Ex: Nubank, Itaú, Inter, Caixa..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-semibold"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Saldo Atual (R$)
            </label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-3 text-sm font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Fatura Aberta (R$)
            </label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              value={currentInvoice}
              onChange={(e) => setCurrentInvoice(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-3 text-sm font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Limite do Cartão (R$)
            </label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              value={creditLimit}
              onChange={(e) => setCreditLimit(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-3 text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Dia Vencimento
            </label>
            <input
              type="number"
              min="1"
              max="31"
              value={dueDay}
              onChange={(e) => setDueDay(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-3 text-sm font-semibold"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">
            Cor do Cartão
          </label>
          <div className="grid grid-cols-4 gap-2">
            {BANK_THEMES.map((t) => (
              <button
                type="button"
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`h-10 rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center transition ${
                  theme === t.id ? 'ring-4 ring-amber-400 scale-95' : 'opacity-80'
                }`}
              >
                {theme === t.id && <CheckCircle2 className="w-5 h-5 text-white" />}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-800 text-amber-300 font-extrabold py-3.5 rounded-2xl shadow-md active:scale-98"
        >
          Salvar Banco
        </button>
      </form>
    </div>
  );
}

function DepositFormModal({ banks, initialBank, onClose, onSave }) {
  const [bankId, setBankId] = useState(initialBank?.id || banks[0]?.id || '');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('Salário / Depósito');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(bankId, amount, description);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 space-y-4 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-slate-900">Adicionar Entrada / Saldo</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-2 bg-slate-100 rounded-full text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
            Valor da Entrada (R$)
          </label>
          <input
            type="number"
            step="0.01"
            inputMode="decimal"
            required
            placeholder="0,00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-2xl font-extrabold text-amber-600"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
            Banco de Destino
          </label>
          <select
            value={bankId}
            onChange={(e) => setBankId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold"
          >
            {banks.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} (Saldo: {formatBRL(b.balance)})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
            Descrição
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-800 text-amber-300 font-extrabold py-3.5 rounded-2xl shadow-md active:scale-98"
        >
          Confirmar Entrada
        </button>
      </form>
    </div>
  );
}

function SubscriptionFormModal({ banks, initialSub, onClose, onSave }) {
  const [name, setName] = useState(initialSub?.name || '');
  const [amount, setAmount] = useState(initialSub?.amount ?? '');
  const [billingDay, setBillingDay] = useState(initialSub?.billingDay ?? 10);
  const [paymentMethod, setPaymentMethod] = useState(initialSub?.paymentMethod || 'credito');
  const [bankId, setBankId] = useState(initialSub?.bankId || banks[0]?.id || '');
  const [category, setCategory] = useState(initialSub?.category || 'lazer');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({
      id: initialSub?.id,
      name: name.trim(),
      amount: parseFloat(String(amount).replace(',', '.')) || 0,
      billingDay: parseInt(billingDay, 10) || 10,
      paymentMethod,
      bankId,
      category,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 space-y-4 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-slate-900">
            {initialSub ? 'Editar Assinatura' : 'Nova Assinatura Recorrente'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-2 bg-slate-100 rounded-full text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
            Nome do Serviço
          </label>
          <input
            type="text"
            required
            placeholder="Ex: Netflix, Internet, Academia, Seguro..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-semibold"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Valor Mensal (R$)
            </label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              required
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-3 text-sm font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Dia da Cobrança
            </label>
            <input
              type="number"
              min="1"
              max="31"
              value={billingDay}
              onChange={(e) => setBillingDay(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-3 text-sm font-semibold"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Forma de Pagamento
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-3 text-sm font-semibold"
            >
              <option value="credito">Cartão de Crédito</option>
              <option value="debito">Débito Automático</option>
              <option value="pix">Pix</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Banco / Cartão
            </label>
            <select
              value={bankId}
              onChange={(e) => setBankId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-3 text-sm font-semibold"
            >
              {banks.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
            Categoria
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-3 text-sm font-semibold"
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-800 text-amber-300 font-extrabold py-3.5 rounded-2xl shadow-md active:scale-98"
        >
          Salvar Assinatura
        </button>
      </form>
    </div>
  );
}

function QuickLaunchKeypadModal({
  banks,
  initialPreset,
  recentDescriptions,
  onClose,
  onOpenFullForm,
  onConfirm,
}) {
  const [centsDigits, setCentsDigits] = useState(() => {
    if (initialPreset?.amount > 0) {
      return String(Math.round(initialPreset.amount * 100));
    }
    return '';
  });

  const [description, setDescription] = useState(initialPreset?.label || '');
  const [paymentMethod, setPaymentMethod] = useState(initialPreset?.paymentMethod || 'credito');
  const [bankId, setBankId] = useState(initialPreset?.bankId || banks[0]?.id || '');
  const [category, setCategory] = useState(initialPreset?.category || 'alimentacao');

  const numericValue = (parseInt(centsDigits || '0', 10) / 100);

  const handleDigitPress = (digit) => {
    if (centsDigits.length >= 9) return;
    setCentsDigits((prev) => (prev === '0' ? digit : prev + digit));
  };

  const handleBackspace = () => {
    setCentsDigits((prev) => prev.slice(0, -1));
  };

  const handleAddQuickAmount = (addReais) => {
    const currentCents = parseInt(centsDigits || '0', 10);
    const nextCents = currentCents + addReais * 100;
    setCentsDigits(String(nextCents));
  };

  const handleSave = () => {
    onConfirm({
      amount: numericValue,
      description,
      category,
      date: new Date().toISOString().split('T')[0],
      member: 'Família',
      paymentMethod,
      bankId,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl p-4 pb-6 space-y-3 shadow-2xl animate-slide-up max-h-[95vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-amber-400 text-slate-950 rounded-xl">
              <Zap className="w-4 h-4 fill-slate-950" />
            </span>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 leading-none">
                Lançamento Rápido
              </h3>
              <button
                type="button"
                onClick={onOpenFullForm}
                className="text-[11px] font-semibold text-purple-700 hover:underline mt-0.5"
              >
                Abrir formulário completo →
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 bg-slate-100 rounded-full text-slate-500 active:scale-90"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-gradient-to-r from-purple-950 to-indigo-950 text-white rounded-2xl p-3.5 flex items-center justify-between border border-amber-400/30">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-purple-200 font-bold block">
              Valor do Gasto
            </span>
            <span className="text-3xl font-black tracking-tight text-amber-400">
              {formatBRL(numericValue)}
            </span>
          </div>
          <div className="flex gap-1.5">
            {[10, 20, 50].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => handleAddQuickAmount(val)}
                className="px-2.5 py-1.5 bg-purple-900 hover:bg-purple-800 text-amber-300 font-extrabold text-xs rounded-xl active:scale-90 border border-amber-400/20"
              >
                +{val}
              </button>
            ))}
          </div>
        </div>

        <div>
          <input
            type="text"
            placeholder="Descrição rápida (opcional, ex: Café, Uber...)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {recentDescriptions.length > 0 && (
            <div className="flex gap-1.5 overflow-x-auto pt-1.5 no-scrollbar">
              {recentDescriptions.map((desc) => (
                <button
                  key={desc}
                  type="button"
                  onClick={() => setDescription(desc)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-purple-50 text-slate-600 rounded-lg text-[10px] font-semibold whitespace-nowrap shrink-0"
                >
                  {desc}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-4 gap-1.5">
          {PAYMENT_METHODS.map((pm) => {
            const active = paymentMethod === pm.id;
            return (
              <button
                key={pm.id}
                type="button"
                onClick={() => setPaymentMethod(pm.id)}
                className={`py-2 rounded-xl text-xs font-extrabold border transition active:scale-95 ${
                  active
                    ? 'bg-purple-800 text-amber-300 border-purple-800 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200'
                }`}
              >
                {pm.label}
              </button>
            );
          })}
        </div>

        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {banks.map((b) => {
            const active = bankId === b.id;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setBankId(b.id)}
                className={`px-3 py-2 rounded-xl text-xs font-extrabold border whitespace-nowrap shrink-0 transition active:scale-95 ${
                  active
                    ? 'bg-purple-950 text-white border-purple-950'
                    : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                {b.name}
              </button>
            );
          })}
        </div>

        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const active = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold border flex items-center gap-1 whitespace-nowrap shrink-0 transition ${
                  active
                    ? 'bg-purple-50 border-purple-700 text-purple-900'
                    : 'bg-white border-slate-200 text-slate-500'
                }`}
              >
                <Icon className="w-3 h-3" />
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-2 pt-1">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0'].map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => handleDigitPress(key)}
              className="py-3 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-900 font-extrabold text-xl rounded-2xl transition active:scale-95"
            >
              {key}
            </button>
          ))}
          <button
            type="button"
            onClick={handleBackspace}
            className="py-3 bg-rose-50 hover:bg-rose-100 active:bg-rose-200 text-rose-600 font-extrabold rounded-2xl flex items-center justify-center transition active:scale-95"
            aria-label="Apagar"
          >
            <Delete className="w-6 h-6" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-purple-800 to-purple-950 hover:from-purple-700 hover:to-purple-900 active:scale-[0.98] text-amber-300 font-extrabold py-4 rounded-2xl shadow-lg shadow-purple-900/25 text-base flex items-center justify-center gap-2 border border-amber-400/30"
        >
          <Zap className="w-5 h-5 fill-amber-300" />
          Confirmar Lançamento
        </button>
      </div>
    </div>
  );
}

function QuickPresetFormModal({ banks, initialPreset, onClose, onSave, onDelete }) {
  const [label, setLabel] = useState(initialPreset?.label || '');
  const [amount, setAmount] = useState(initialPreset?.amount ?? '');
  const [category, setCategory] = useState(initialPreset?.category || 'alimentacao');
  const [paymentMethod, setPaymentMethod] = useState(initialPreset?.paymentMethod || 'pix');
  const [bankId, setBankId] = useState(initialPreset?.bankId || banks[0]?.id || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!label.trim()) return;
    onSave({
      id: initialPreset?.id,
      label: label.trim(),
      amount: parseFloat(String(amount).replace(',', '.')) || 0,
      category,
      paymentMethod,
      bankId,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 space-y-4 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-slate-900">
            {initialPreset ? 'Editar Atalho 1-Toque' : 'Novo Atalho 1-Toque'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-2 bg-slate-100 rounded-full text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
            Nome do Atalho
          </label>
          <input
            type="text"
            required
            placeholder="Ex: Padaria, Uber Trabalho, Feira..."
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-semibold"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
            Valor Fixo (R$) — Deixe 0 para digitar na hora
          </label>
          <input
            type="number"
            step="0.01"
            inputMode="decimal"
            placeholder="0,00 (Valor livre)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-base font-extrabold text-purple-800"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Pagamento
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-3 text-sm font-semibold"
            >
              {PAYMENT_METHODS.map((pm) => (
                <option key={pm.id} value={pm.id}>
                  {pm.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
              Banco / Cartão
            </label>
            <select
              value={bankId}
              onChange={(e) => setBankId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3 py-3 text-sm font-semibold"
            >
              {banks.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
            Categoria
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-3 text-sm font-semibold"
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 pt-1">
          {initialPreset && (
            <button
              type="button"
              onClick={() => onDelete(initialPreset.id)}
              className="px-4 py-3.5 bg-rose-50 text-rose-600 font-bold rounded-2xl text-sm"
            >
              Excluir
            </button>
          )}
          <button
            type="submit"
            className="flex-1 bg-purple-800 text-amber-300 font-extrabold py-3.5 rounded-2xl shadow-md active:scale-98"
          >
            Salvar Atalho
          </button>
        </div>
      </form>
    </div>
  );
}
