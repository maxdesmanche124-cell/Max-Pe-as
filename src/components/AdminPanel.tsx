import React, { useState, useEffect } from 'react';
import { 
  Lock, Mail, Key, Shield, Image, Plus, Trash2, 
  RotateCcw, RefreshCw, Eye, X, Check, EyeOff, Save
} from 'lucide-react';
import { 
  getSavedImages, updateImageUrl, addCustomImage, 
  removeCustomImage, SiteImage, saveImages 
} from '../utils/imageStore';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Dashboard states
  const [images, setImages] = useState<SiteImage[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  
  // Adding new custom image form
  const [newImgName, setNewImgName] = useState('');
  const [newImgUrl, setNewImgUrl] = useState('');
  const [newImgCat, setNewImgCat] = useState<SiteImage['category']>('category');
  const [newImgDesc, setNewImgDesc] = useState('');

  // Editing existing image state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingUrl, setEditingUrl] = useState('');

  // Feedbacks
  const [successMsg, setSuccessMsg] = useState('');

  // Sync state on load or change
  useEffect(() => {
    if (isOpen) {
      setImages(getSavedImages());
      // Check if already authenticated in this session
      const auth = sessionStorage.getItem('maxpecas_auth');
      if (auth === 'true') {
        setIsAuthenticated(true);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'contato.maxpecas@gmail.com' && password === '117711') {
      setIsAuthenticated(true);
      setErrorMsg('');
      sessionStorage.setItem('maxpecas_auth', 'true');
    } else {
      setErrorMsg('E-mail ou senha incorretos. Tente novamente.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('maxpecas_auth');
    setEmail('');
    setPassword('');
  };

  const showFeedback = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleReplaceImageUrl = (id: string) => {
    if (!editingUrl.trim()) return;
    const updated = updateImageUrl(id, editingUrl.trim());
    setImages(updated);
    setEditingId(null);
    setEditingUrl('');
    showFeedback('Imagem editada com sucesso e salva no dispositivo!');
  };

  const handleAddCustomImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImgName.trim() || !newImgUrl.trim()) {
      alert('Por favor, preencha o nome da imagem e o link da URL.');
      return;
    }
    const updated = addCustomImage(newImgCat, newImgName.trim(), newImgUrl.trim(), newImgDesc.trim());
    setImages(updated);
    
    // reset form
    setNewImgName('');
    setNewImgUrl('');
    setNewImgDesc('');
    showFeedback('Nova imagem cadastrada e salva com sucesso!');
  };

  const handleRemoveImage = (id: string, isCustom?: boolean) => {
    if (!isCustom) {
      alert('Imagens base do sistema não podem ser excluídas, apenas substituídas ou recolocadas em redundância.');
      return;
    }
    if (confirm('Tem certeza de que deseja remover esta imagem cadastrada?')) {
      const updated = removeCustomImage(id);
      setImages(updated);
      showFeedback('Imagem personalizada removida com sucesso!');
    }
  };

  const handleResetToFactory = () => {
    if (confirm('Atenção: isto removerá permanentemente as personalizações e reverterá todas as fotos para o banco de imagens padrão da MAXPEÇAS. Deseja prosseguir?')) {
      localStorage.removeItem('maxpecas_managed_images');
      // trigger page reload to propagate easily
      window.location.reload();
    }
  };

  const categoriesList = [
    { value: 'all', label: 'Todas as Seções' },
    { value: 'banner', label: 'Banners de Fundo' },
    { value: 'category', label: 'Categorias de Autopeças' },
    { value: 'multimarca', label: 'Mini Cards Multimarcas' },
    { value: 'institutional', label: 'Institucional (Sobre / Envios)' }
  ];

  const filteredImages = filterCategory === 'all' 
    ? images 
    : images.filter(img => img.category === filterCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-hidden animate-fade-in">
      <div 
        id="admin-outer-frame"
        className="w-full max-w-5xl bg-[#1A1C1E] border border-stone-800 rounded-sm shadow-2xl flex flex-col max-h-[92vh] text-white"
      >
        {/* Header bar */}
        <div className="px-6 py-4 bg-stone-950 border-b border-stone-850 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" />
            <h2 className="font-display font-bold text-sm md:text-base uppercase tracking-widest italic">
              Painel de Administração <span className="text-red-500">MAXPEÇAS</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            id="admin-close-x-btn"
            className="p-1.5 hover:bg-stone-900 rounded text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Auth Page */}
        {!isAuthenticated ? (
          <div className="p-8 md:p-12 max-w-md mx-auto w-full my-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="h-12 w-12 bg-red-600/10 border border-red-500/20 text-red-500 rounded-sm flex items-center justify-center mx-auto">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="font-display font-extrabold text-xl uppercase italic tracking-tight text-white">
                Acesso Restrito
              </h3>
              <p className="text-stone-400 text-xs leading-relaxed">
                Insira as credenciais administrativas autorizadas para gerenciar os arquivos de mídias e imagens do portal.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-mono font-bold text-stone-400 uppercase tracking-wider block">
                  E-mail do Administrador
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contato.maxpecas@gmail.com"
                    className="w-full bg-stone-950 border border-stone-800 text-white rounded-sm pl-10 pr-4 py-3 placeholder:text-stone-600 text-sm focus:border-red-600 focus:outline-none focus:ring-0"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-mono font-bold text-stone-400 uppercase tracking-wider block">
                  Chave Secreta de Acesso
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500">
                    <Key className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Sua senha numérica"
                    className="w-full bg-stone-950 border border-stone-800 text-white rounded-sm pl-10 pr-10 py-3 placeholder:text-stone-600 text-sm focus:border-red-600 focus:outline-none focus:ring-0"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-500 hover:text-stone-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {errorMsg && (
                <p className="text-red-500 text-xs font-bold bg-red-600/10 border border-red-500/20 p-2.5 rounded-sm">
                  ⚠️ {errorMsg}
                </p>
              )}

              <button
                type="submit"
                id="admin-form-submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm py-3.5 rounded-sm uppercase italic tracking-widest transition-colors cursor-pointer"
              >
                Autenticar Painel
              </button>
            </form>
          </div>
        ) : (
          /* Logged In Dashboard View */
          <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
            
            {/* Sidebar form: Add Custom image */}
            <div className="w-full lg:w-80 bg-stone-950 p-6 border-r border-stone-850 flex flex-col justify-between overflow-y-auto max-h-[40vh] lg:max-h-none border-b lg:border-b-0">
              <div className="space-y-4">
                <div className="border-b border-stone-850 pb-3">
                  <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider italic flex items-center gap-1.5">
                    <Plus className="h-4 w-4 text-red-500" /> Adicionar Mídia Customizada
                  </h4>
                  <p className="text-[10px] text-stone-500">Cadastre uma nova autopeça ou banner usando um link externo de imagem.</p>
                </div>

                <form onSubmit={handleAddCustomImage} className="space-y-3 text-left">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-stone-400 block">NOME DA IMAGEM</label>
                    <input
                      type="text"
                      required
                      value={newImgName}
                      onChange={(e) => setNewImgName(e.target.value)}
                      placeholder="Ex: Categoria - Chassi Especial"
                      className="w-full bg-stone-900 border border-stone-800 text-white/90 rounded-sm px-3 py-2 text-xs focus:border-red-600 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-stone-400 block">LINK DA IMAGEM (URL URL)</label>
                    <input
                      type="url"
                      required
                      value={newImgUrl}
                      onChange={(e) => setNewImgUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-stone-900 border border-stone-800 text-white/90 rounded-sm px-3 py-2 text-xs focus:border-red-600 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-stone-400 block">VINCULAÇÃO / CATEGORIA</label>
                    <select
                      value={newImgCat}
                      onChange={(e) => setNewImgCat(e.target.value as SiteImage['category'])}
                      className="w-full bg-stone-900 border border-stone-800 text-white/90 rounded-sm px-3 py-2 text-xs focus:border-red-600 focus:outline-none uppercase"
                    >
                      <option value="category">Categorias de Autopeças</option>
                      <option value="multimarca">Mini Cards Multimarcas</option>
                      <option value="banner">Banners de Fundo</option>
                      <option value="institutional">Imagens Institucionais</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-stone-400 block">BREVE DESCRIÇÃO</label>
                    <textarea
                      value={newImgDesc}
                      onChange={(e) => setNewImgDesc(e.target.value)}
                      placeholder="Identificador ou marca principal..."
                      rows={2}
                      className="w-full bg-stone-900 border border-stone-800 text-white/90 rounded-sm px-3 py-2 text-xs focus:border-red-600 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-stone-820 hover:bg-red-600 text-white font-bold text-[11px] py-2 px-3 rounded-sm uppercase tracking-wider italic transition-all cursor-pointer block"
                  >
                    Salvar Novo Registro
                  </button>
                </form>
              </div>

              {/* Reset defaults button in footer of sidebar */}
              <div className="pt-6 border-t border-stone-850 mt-4 space-y-3">
                <button
                  type="button"
                  onClick={handleResetToFactory}
                  className="w-full border border-stone-800 hover:border-red-500/40 hover:bg-red-950/20 text-stone-400 hover:text-white flex items-center justify-center gap-1.5 text-[10px] font-mono font-bold text-center py-2 px-3 rounded-sm transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3 text-red-500" />
                  RESTAURAR PADRÕES DO SITE
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full bg-stone-900 hover:bg-stone-850 text-stone-300 text-[10px] font-bold text-center py-2 px-3 rounded-sm uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Sair do Dashboard
                </button>
              </div>
            </div>

            {/* Main Manager section */}
            <div className="flex-1 p-6 flex flex-col justify-between overflow-hidden">
              <div className="space-y-6 flex-1 flex flex-col overflow-hidden">
                
                {/* Header controls & Filters */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
                  <div>
                    <h3 className="font-display font-black text-lg text-white uppercase italic tracking-tight">
                      Banco de Imagens Ativas
                    </h3>
                    <p className="text-xs text-stone-400">Adicione, edite ou remova qualquer foto/background exibido nas páginas.</p>
                  </div>

                  {/* Filter selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-stone-500 uppercase">Filtrar:</span>
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="bg-stone-950 border border-stone-800 text-white rounded px-2.5 py-1.5 text-xs focus:border-red-600 focus:outline-none focus:ring-0 uppercase"
                    >
                      {categoriesList.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Status messages banner */}
                {successMsg && (
                  <div className="bg-emerald-600/15 border border-emerald-500/30 text-emerald-400 p-2.5 rounded-sm text-xs font-bold text-center animate-pulse">
                    🚀 {successMsg}
                  </div>
                )}

                {/* Scrollable list grid */}
                <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-1 sm:grid-cols-2 gap-4" id="admin-images-scroll-grid">
                  {filteredImages.length === 0 ? (
                    <div className="col-span-full text-center py-20 text-stone-500 space-y-2">
                      <Image className="h-10 w-10 mx-auto text-stone-700" />
                      <p className="text-sm font-semibold">Nenhuma imagem neste filtro cadastrada</p>
                    </div>
                  ) : (
                    filteredImages.map((img) => (
                      <div
                        key={img.id}
                        className="bg-stone-950 border border-stone-850 p-4 rounded-sm flex items-start gap-4 hover:border-stone-700 transition duration-150 relative group"
                      >
                        {/* Thumbnail View Frame with Referrer Policy protection */}
                        <div className="h-20 w-20 bg-stone-900 rounded overflow-hidden flex-shrink-0 border border-stone-800 relative group/thumb">
                          <img
                            src={img.url}
                            alt={img.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover object-center"
                          />
                          <a
                            href={img.url}
                            target="_blank"
                            rel="noreferrer"
                            className="absolute inset-0 bg-black/60 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center transition-all duration-150"
                          >
                            <Eye className="h-4 w-4 text-white" />
                          </a>
                        </div>

                        {/* Text fields & Actions */}
                        <div className="flex-grow min-y-0 relative text-left">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-mono bg-red-600/10 text-red-400 border border-red-500/10 px-2 py-0.5 rounded uppercase tracking-wider italic">
                              {img.category}
                            </span>
                            {img.isCustom && (
                              <span className="text-[9px] font-mono bg-stone-800 text-stone-300 px-1.5 py-0.5 rounded">
                                Customizada
                              </span>
                            )}
                          </div>
                          <h4 className="font-display font-bold text-sm text-white truncate mt-1">
                            {img.name}
                          </h4>
                          <p className="text-[10px] text-stone-400 leading-tight block truncate">
                            {img.description || 'Nenhuma descrição detalhada fornecida.'}
                          </p>

                          {editingId === img.id ? (
                            /* Submitting replace overlay */
                            <div className="mt-2 text-left space-y-1.5">
                              <input
                                type="url"
                                value={editingUrl}
                                onChange={(e) => setEditingUrl(e.target.value)}
                                placeholder="Insira o novo link para a imagem..."
                                className="w-full bg-stone-900 border border-stone-800 text-white rounded p-1.5 text-[11px] focus:outline-none focus:border-red-650"
                                autoFocus
                              />
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleReplaceImageUrl(img.id)}
                                  className="bg-red-600 text-white px-2.5 py-1 rounded-sm text-[10px] font-bold flex items-center gap-1 hover:bg-red-700 transition"
                                >
                                  <Save className="h-3 w-3" /> Gravar Link
                                </button>
                                <button
                                  onClick={() => {
                                    setEditingId(null);
                                    setEditingUrl('');
                                  }}
                                  className="text-[10px] text-stone-500 hover:text-stone-300 py-1"
                                >
                                  Cancelar
                                </button>
                              </div>
                            </div>
                          ) : (
                            /* Options footer trigger */
                            <div className="flex items-center gap-3 mt-3">
                              <button
                                onClick={() => {
                                  setEditingId(img.id);
                                  setEditingUrl(img.url);
                                }}
                                className="inline-flex items-center gap-1 text-[11px] text-red-500 hover:text-red-400 font-bold uppercase tracking-wider italic cursor-pointer btn-editor-trigger"
                              >
                                <RefreshCw className="h-3 w-3" /> Substituir
                              </button>
                              {img.isCustom && (
                                <button
                                  onClick={() => handleRemoveImage(img.id, img.isCustom)}
                                  className="inline-flex items-center gap-1 text-[11px] text-stone-500 hover:text-red-500 transition-colors uppercase cursor-pointer"
                                  title="Remover mídia customizada permanentemente"
                                >
                                  <Trash2 className="h-3 w-3" /> Remover
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>

              </div>

              {/* Status information footer of dashboard */}
              <div className="pt-4 border-t border-stone-850 mt-4 flex items-center justify-between text-[11px] text-stone-500">
                <p>💡 Links de imagem devem ser públicos e diretos (Unsplash, Pexels, Imgur, etc.).</p>
                <p className="font-mono text-[10px]">Total indexado: {images.length}</p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
