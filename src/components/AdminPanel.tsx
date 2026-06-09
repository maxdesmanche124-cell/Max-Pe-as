import React, { useState, useEffect } from 'react';
import { 
  Lock, Mail, Key, Shield, Image as ImageIcon, Plus, Trash2, 
  RotateCcw, RefreshCw, Eye, X, Check, EyeOff, Save, Upload, AlertCircle, Database
} from 'lucide-react';
import { 
  getSavedImages, updateImageUrl, addCustomImage, 
  removeCustomImage, SiteImage, saveImages, migrateAllImagesToSupabase, saveMetadataToSupabase,
  resetImageToDefault
} from '../utils/imageStore';
import { isSupabaseConfigured } from '../utils/supabaseClient';

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

  // Supabase state
  const isSupbaseActive = isSupabaseConfigured();

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
  
  // Loader states
  const [isUploading, setIsUploading] = useState(false);
  const [isReplacing, setIsReplacing] = useState(false);
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationProgress, setMigrationProgress] = useState('');
  const [isSyncingCategories, setIsSyncingCategories] = useState(false);

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
    if (email === 'MAXDOIMOPINHEIROAUTOPECAS@gmail.com' && password === '117711') {
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
    setTimeout(() => setSuccessMsg(''), 6000);
  };

  // Replacement function
  const handleReplaceImageUrl = (id: string) => {
    if (!editingUrl.trim()) return;
    const updated = updateImageUrl(id, editingUrl.trim());
    setImages(updated);
    setEditingId(null);
    setEditingUrl('');
    showFeedback('Imagem editada com sucesso e cadastrada no Supabase!');
  };

  // Upload file handler for ADD form
  const handleUploadNewFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isSupbaseActive) {
      alert('Atenção: Supabase não está configurado. Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY para habilitar upload de mídia direto!');
      return;
    }

    setIsUploading(true);
    try {
      const { uploadToStorage } = await import('../utils/supabaseClient');
      const cleanFilename = `uploads/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const publicUrl = await uploadToStorage(cleanFilename, file, file.type);
      if (publicUrl) {
        setNewImgUrl(publicUrl);
        showFeedback('Foto enviada com sucesso ao Supabase Storage!');
      } else {
        alert('Falha ao obter URL pública após upload. Tente novamente.');
      }
    } catch (err: any) {
      console.error(err);
      alert('Erro inesperado no envio: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Upload file handler for REPLACE action
  const handleUploadReplacementFile = async (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isSupbaseActive) {
      alert('Supabase não configurado para upload direto.');
      return;
    }

    setIsReplacing(true);
    console.log(`[AdminPanel] Iniciando substituição de mídia para o ID "${id}" com o arquivo "${file.name}"...`);
    try {
      const { uploadToStorage } = await import('../utils/supabaseClient');
      const cleanFilename = `uploads/replace-${id}-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      
      console.log(`[AdminPanel] Fazendo upload do novo arquivo para o bucket "site-images" no caminho "${cleanFilename}"...`);
      const publicUrl = await uploadToStorage(cleanFilename, file, file.type);
      
      if (publicUrl) {
        console.log(`[AdminPanel] Upload bem sucedido! URL pública gerada: ${publicUrl}`);
        console.log('[AdminPanel] Gravando e salvando a nova URL no estado e banco de dados do site...');
        
        // Save the generated publicUrl to localized storage / Supabase metadata bank
        const updated = updateImageUrl(id, publicUrl);
        setImages(updated);
        setEditingId(null);
        setEditingUrl('');
        showFeedback('Substituição de imagem realizada e salva com sucesso!');
      } else {
        console.error(`[AdminPanel] Não foi possível obter a URL pública para "${cleanFilename}". O upload pode ter falhado devido a restrições de RLS (Row Level Security) ou bucket inexistente.`);
        alert('Falha no upload do arquivo de substituição. O bucket pode não existir ou o RLS do Supabase bloqueou o upload por regras de segurança. Abra as ferramentas de desenvolvedor (F12) e veja o painel Console para instruções detalhadas de diagnóstico e correção!');
      }
    } catch (err: any) {
      console.error('[AdminPanel] Ocorreu um erro inesperado ao executar o upload do arquivo de substituição:', err);
      alert('Erro inesperado no upload de substituição: ' + err.message + '\nConsulte o console para mais detalhes técnicos de diagnóstico.');
    } finally {
      setIsReplacing(false);
    }
  };

  const handleAddCustomImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImgName.trim() || !newImgUrl.trim()) {
      alert('Por favor, preencha o nome da imagem e defina a imagem através de Upload ou link de URL.');
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
      alert('Imagens de sistema não podem ser excluídas, apenas substituídas.');
      return;
    }
    if (confirm('Tem certeza de que deseja remover esta imagem cadastrada?')) {
      const updated = removeCustomImage(id);
      setImages(updated);
      showFeedback('Imagem personalizada removida com sucesso!');
    }
  };

  const handleResetImage = (id: string) => {
    if (confirm('Deseja realmente remover a foto substituída e retornar este item para a imagem padrão do site?')) {
      const updated = resetImageToDefault(id);
      setImages(updated);
      showFeedback('Imagem restaurada para o padrão com sucesso!');
    }
  };

  const handleResetToFactory = () => {
    if (confirm('Atenção: isto reverterá todas as imagens para as fotos padrão. Se o Supabase estiver ativo, os metadados serão re-sincronizados. Deseja prosseguir?')) {
      localStorage.removeItem('maxpecas_managed_images');
      window.location.reload();
    }
  };

  // Perform full image migration to Supabase Storage
  const handleStartMigration = async () => {
    if (!isSupbaseActive) {
      alert('Supabase não configurado de forma produtiva!');
      return;
    }
    if (!confirm('Este processo irá transferir AUTOMATICAMENTE todas as fotos que estão rodando em servidores terceiros (Unsplash/Imgur) direto para os seus buckets do Supabase Storage. Deseja iniciar a migração em massa?')) {
      return;
    }
    setIsMigrating(true);
    try {
      const updatedList = await migrateAllImagesToSupabase((idx, total) => {
        setMigrationProgress(`Transferindo imagem ${idx} de ${total}...`);
      });
      setImages(updatedList);
      showFeedback('Todas as mídias foram devidamente migradas e centralizadas no seu Supabase Storage!');
    } catch (err: any) {
      console.error(err);
      alert('Erro ao migrar: ' + err.message);
    } finally {
      setIsMigrating(false);
      setMigrationProgress('');
    }
  };

  // Synchronize category images directly from Supabase table 'category_images'
  const handleSyncCategoryImages = async () => {
    if (!isSupbaseActive) {
      alert('O Supabase não está ativo ou configurado. Por favor, verifique suas chaves de API nas configurações.');
      return;
    }
    setIsSyncingCategories(true);
    try {
      const { fetchCategoryImagesFromSupabase } = await import('../utils/imageStore');
      await fetchCategoryImagesFromSupabase();
      setImages(getSavedImages());
      showFeedback('Sincronização concluída! As mídias das categorias cadastradas no Supabase foram recarregadas com sucesso.');
    } catch (err: any) {
      console.error(err);
      alert('Falha na sincronização das imagens de categorias: ' + err.message);
    } finally {
      setIsSyncingCategories(false);
    }
  };

  // Categorias List organizadas de acordo com as instruções
  const categoriesList = [
    { value: 'all', label: 'Todas as Seções' },
    { value: 'banner', label: 'Banner Principal' },
    { value: 'category', label: 'Categorias de Peças' },
    { value: 'diferencial', label: 'Diferenciais' },
    { value: 'institutional', label: 'Institucional' },
    { value: 'reviews', label: 'Avaliações' },
    { value: 'general', label: 'Imagens Gerais' }
  ];

  // Metadata mappings for each tab section
  const tabMetas: Record<string, { title: string; desc: string; icon: string }> = {
    all: { title: 'Todas as Seções', desc: 'Exibe todo o acervo de imagens do site de uma só vez', icon: '📁' },
    banner: { title: 'Banner Principal', desc: 'Plano de fundo gigante e fotos da seção superior principal', icon: '🖼️' },
    category: { title: 'Categorias de Peças', desc: 'As fotos de autopeças exibidas na grade redonda de departamentos', icon: '⚙️' },
    diferencial: { title: 'Diferenciais', desc: 'Fotos internas da seção de Diferenciais e Peças Originais', icon: '👑' },
    institutional: { title: 'Institucional', desc: 'Fotos utilizadas na seção "Sobre Nós" e "Envio para Todo o Brasil"', icon: '🏢' },
    reviews: { title: 'Avaliações de Clientes', desc: 'Avatares de compradores reais exibidos no carrossel de depoimentos', icon: '⭐' },
    general: { title: 'Imagens Gerais', desc: 'Fotos gerais de fachada da loja física, mapa estático ou favicons extras', icon: '📦' }
  };

  const filteredImages = filterCategory === 'all' 
    ? images 
    : images.filter(img => img.category === filterCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-hidden animate-fade-in">
      <div 
        id="admin-outer-frame"
        className="w-full max-w-5xl bg-[#1A1C1E] border border-stone-850 rounded-sm shadow-2xl flex flex-col max-h-[92vh] text-white"
      >
        {/* Header bar */}
        <div className="px-6 py-4 bg-stone-950 border-b border-stone-850 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-500" />
            <h2 className="font-display font-bold text-sm md:text-base uppercase tracking-widest italic flex items-center gap-2">
              Painel Administrativo <span className="text-emerald-500">Supabase Storage</span>
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
          <div className="p-6 md:p-10 max-w-md mx-auto w-full my-auto space-y-5 overflow-y-auto max-h-[80vh] animate-fade-in">
            <div className="text-center space-y-2">
              <div className="h-12 w-12 bg-emerald-600/10 border border-emerald-500/20 text-emerald-500 rounded-sm flex items-center justify-center mx-auto">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="font-display font-extrabold text-xl uppercase italic tracking-tight text-white">
                Acesso Restrito
              </h3>
              <p className="text-stone-400 text-xs leading-relaxed">
                Insira as credenciais do gerente para habilitar o gerenciamento na nuvem do Supabase Storage.
              </p>
            </div>

            {/* Dynamic Helpful URL instructions block */}
            <div className="bg-[#121314] border border-stone-850 p-3 rounded-sm space-y-2 text-left">
              <span className="text-[10px] font-mono font-bold text-emerald-500 block uppercase">
                💡 Dica de Acesso Rápido no Netlify:
              </span>
              <p className="text-[10.5px] text-stone-450 leading-relaxed">
                Como o site é uma SPA, se você digitar diretamente <code className="text-white font-mono bg-stone-900 px-1 py-0.5 rounded">/paineladmin</code> e der erro, acesse usando uma destas URLs alternativas que abrem instantaneamente:
              </p>
              <ul className="text-[10px] font-mono text-stone-300 space-y-1 list-disc list-inside">
                <li><span className="text-[9px] text-emerald-400">Recomendado:</span> <span className="text-white">/?paineladmin</span></li>
                <li><span className="text-[9px] text-emerald-400">Opção 2:</span> <span className="text-white">/#paineladmin</span></li>
              </ul>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div className="space-y-1.5">
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
                    placeholder="MAXDOIMOPINHEIROAUTOPECAS@gmail.com"
                    className="w-full bg-stone-950 border border-stone-800 text-white rounded-sm pl-10 pr-4 py-3 placeholder:text-stone-650 text-sm focus:border-emerald-600 focus:outline-none focus:ring-0"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
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
                    className="w-full bg-stone-950 border border-stone-800 text-white rounded-sm pl-10 pr-10 py-3 placeholder:text-stone-650 text-sm focus:border-emerald-600 focus:outline-none focus:ring-0"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-500 hover:text-stone-300 pointer-events-auto"
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
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3.5 rounded-sm uppercase italic tracking-widest transition-colors cursor-pointer text-center"
              >
                Autenticar Painel
              </button>
            </form>
          </div>
        ) : (
          /* Logged In Dashboard View */
          <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
            
            {/* Sidebar form: Add Custom image */}
            <div className="w-full lg:w-80 bg-stone-950 p-6 border-r border-stone-850 flex flex-col justify-between overflow-y-auto max-h-[38vh] lg:max-h-none border-b lg:border-b-0">
              <div className="space-y-4">
                <div className="border-b border-stone-850 pb-3">
                  <h4 className="font-display font-bold text-white text-xs uppercase tracking-wider italic flex items-center gap-1.5">
                    <Plus className="h-4 w-4 text-emerald-500" /> Adicionar Mídia Customizada
                  </h4>
                  <p className="text-[10px] text-stone-500 leading-relaxed mt-1">
                    Envie fotos direto do seu computador para o Supabase ou cole uma URL externa corporativa.
                  </p>
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
                      className="w-full bg-stone-900 border border-stone-800 text-white/90 rounded-sm px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-mono font-bold text-stone-400 block">IMAGEM / ARQUIVO</label>
                      {isUploading && <span className="text-[9px] text-emerald-400 font-mono animate-pulse">Enviando...</span>}
                    </div>

                    {/* Local File Upload Input */}
                    <div className="relative flex items-center justify-center bg-stone-900 border border-dashed border-stone-800 hover:border-emerald-500 rounded-sm p-3 transition duration-150 group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleUploadNewFile}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={isUploading}
                      />
                      <div className="flex flex-col items-center justify-center text-center space-y-1.5 pointer-events-none text-stone-400">
                        <Upload className="h-4 w-4 text-stone-500 group-hover:text-emerald-400 group-hover:scale-105 transition" />
                        <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 group-hover:text-stone-300">
                          {isUploading ? 'Processando...' : 'Selecionar do Computador'}
                        </span>
                      </div>
                    </div>

                    <div className="text-center text-stone-650 text-[9px] font-mono my-1 uppercase">OU INSERIR VIA ENDEREÇO LINK</div>

                    <input
                      type="url"
                      required
                      value={newImgUrl}
                      onChange={(e) => setNewImgUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-stone-900 border border-stone-800 text-white/95 rounded-sm px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-stone-400 block">VINCULAÇÃO / CATEGORIA</label>
                    <select
                      value={newImgCat}
                      onChange={(e) => setNewImgCat(e.target.value as SiteImage['category'])}
                      className="w-full bg-stone-900 border border-stone-800 text-white/90 rounded-sm px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none uppercase"
                    >
                      <option value="banner">Banner Principal</option>
                      <option value="category">Categorias de Peças</option>
                      <option value="diferencial">Diferenciais</option>
                      <option value="institutional">Institucional</option>
                      <option value="reviews">Avaliações</option>
                      <option value="general">Imagens Gerais</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-stone-400 block">BREVE DESCRIÇÃO</label>
                    <textarea
                      value={newImgDesc}
                      onChange={(e) => setNewImgDesc(e.target.value)}
                      placeholder="Marca representativa ou legenda..."
                      rows={2}
                      className="w-full bg-stone-900 border border-stone-800 text-white/90 rounded-sm px-3 py-2 text-xs focus:border-emerald-600 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isUploading}
                    className="w-full bg-[#2a2d30] hover:bg-emerald-600 disabled:opacity-40 text-white font-bold text-[11px] py-2.5 px-3 rounded-sm uppercase tracking-wider italic transition-all cursor-pointer block text-center"
                  >
                    Salvar Registro Customizado
                  </button>
                </form>
              </div>

              {/* Reset defaults button in footer of sidebar */}
              <div className="pt-4 border-t border-stone-850 mt-4 space-y-2.5">
                <button
                  type="button"
                  onClick={handleResetToFactory}
                  className="w-full border border-stone-800 hover:border-emerald-500/40 hover:bg-emerald-950/10 text-stone-400 hover:text-white flex items-center justify-center gap-1.5 text-[10px] font-mono font-bold text-center py-2 px-3 rounded-sm transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3 text-emerald-500" />
                  RESTAURAR IMAGENS PADRÃO
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
            <div className="flex-1 p-6 flex flex-col justify-between overflow-hidden text-left">
              <div className="space-y-4 flex-1 flex flex-col overflow-hidden">
                
                {/* Connection Status Header Bar */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-stone-850 pb-3">
                  <div>
                    <h3 className="font-display font-black text-lg text-white uppercase italic tracking-tight">
                      Mídias em Nuvem (Supabase)
                    </h3>
                    <p className="text-xs text-stone-400">Insira, edite e acompanhe os arquivos carregados do bucket "site-images".</p>
                  </div>

                  {/* Supabase status indicator */}
                  <div className="flex flex-wrap gap-2 items-center">
                    {isSupbaseActive ? (
                      <div className="inline-flex items-center gap-1.5 bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-1.5 rounded-sm text-xs font-bold">
                        <Database className="h-3.5 w-3.5 text-emerald-500" />
                        SUPABASE ATIVO
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 bg-yellow-600/10 border border-yellow-500/20 text-yellow-500 px-2.5 py-1.5 rounded-sm text-xs font-bold">
                        <AlertCircle className="h-3.5 w-3.5 text-yellow-500" />
                        MOCK / LOCAL STORAGE
                      </div>
                    )}

                    {isSupbaseActive && (
                      <button
                        onClick={handleStartMigration}
                        disabled={isMigrating}
                        className="inline-flex items-center gap-1.5 bg-stone-900 border border-stone-800 hover:bg-emerald-950 hover:text-emerald-300 hover:border-emerald-500/40 text-stone-300 px-3 py-1.5 rounded-sm text-xs font-bold transition disabled:opacity-50"
                      >
                        <Upload className="h-3.5 w-3.5 text-emerald-400" />
                        {isMigrating ? 'Migrando...' : 'Migrar tudo pro Supabase'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Migration status logging */}
                {isMigrating && (
                  <div className="bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 px-4 py-3 rounded-sm text-xs font-mono font-bold flex items-center gap-2 animate-pulse mb-1">
                    <RefreshCw className="h-3.5 w-3.5 animate-spin text-emerald-500" />
                    <span>Migração em andamento: {migrationProgress}</span>
                  </div>
                )}

                {/* Filter & categorization selector reconstructed to visual section tabs */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-widest">Navegar por Seção (Abas):</span>
                    <span className="text-[11px] text-stone-400 font-mono">
                      Mostrando <span className="font-bold text-white bg-stone-900 px-1.5 py-0.5 rounded border border-stone-800">{filteredImages.length}</span> imagens
                    </span>
                  </div>
                  
                  {/* Grid layout of Section Switcher Tabs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                    {categoriesList.map((opt) => {
                      const isActive = filterCategory === opt.value;
                      const count = opt.value === 'all' 
                        ? images.length 
                        : images.filter(img => img.category === opt.value).length;
                      const config = tabMetas[opt.value];
                      const icon = config?.icon || '📁';
                      
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setFilterCategory(opt.value)}
                          className={`flex flex-col items-center justify-center p-2 rounded-sm border transition text-center cursor-pointer ${
                            isActive 
                              ? 'bg-emerald-600/15 border-emerald-550 text-white font-bold shadow-lg shadow-emerald-950/20 scale-[1.02]' 
                              : 'bg-[#151618] border-stone-850 text-stone-400 hover:border-stone-700 hover:text-white'
                          }`}
                        >
                          <span className="text-lg mb-0.5">{icon}</span>
                          <span className="text-[9.5px] uppercase tracking-wider block font-bold leading-tight truncate w-full">
                            {opt.label.replace('Categorias de ', '').replace('Imagens ', '')}
                          </span>
                          <span className="text-[9px] font-mono mt-1 px-1.5 py-0.2 font-black rounded-sm bg-stone-950 text-stone-400">
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Tab Explanation block */}
                  <div className="bg-[#151618] border border-stone-850 p-2.5 rounded-sm text-xs text-stone-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{tabMetas[filterCategory]?.icon}</span>
                        <p className="text-[11px] leading-relaxed text-left">
                          <strong className="text-emerald-400 uppercase font-black mr-1">{tabMetas[filterCategory]?.title}:</strong>
                          <span className="text-stone-400">{tabMetas[filterCategory]?.desc}</span>
                        </p>
                      </div>
                      
                      {filterCategory === 'category' && isSupbaseActive && (
                        <button
                          type="button"
                          onClick={handleSyncCategoryImages}
                          disabled={isSyncingCategories}
                          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-sm cursor-pointer whitespace-nowrap transition-colors"
                        >
                          <RefreshCw className={`h-3 w-3 ${isSyncingCategories ? 'animate-spin' : ''}`} />
                          {isSyncingCategories ? 'Sincronizando...' : 'Sincronizar imagens do Supabase'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status messages banner */}
                {successMsg && (
                  <div className="bg-emerald-650/15 border border-emerald-500/20 text-emerald-400 p-2 text-xs font-bold text-center">
                    📢 {successMsg}
                  </div>
                )}

                {/* Scrollable list grid */}
                <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-1 sm:grid-cols-2 gap-4" id="admin-images-scroll-grid">
                  {filteredImages.length === 0 ? (
                    <div className="col-span-full text-center py-20 text-stone-500 space-y-2 bg-stone-950 rounded-sm border border-stone-850">
                      <ImageIcon className="h-10 w-10 mx-auto text-stone-700 font-bold" />
                      <p className="text-sm font-semibold">Nenhuma imagem neste filtro cadastrada</p>
                    </div>
                  ) : (
                    filteredImages.map((img) => {
                      const isRemoteUnsplash = !img.url.includes('.supabase.co/storage/v1/object/public/site-images');
                      
                      return (
                        <div
                          key={img.id}
                          className="bg-stone-950 border border-stone-850 p-3 h-fit rounded-sm flex items-start gap-4 hover:border-stone-700 transition duration-150 relative group"
                        >
                          {/* Thumbnail View Frame */}
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
                          <div className="flex-grow min-w-0 relative">
                            <div className="flex flex-wrap gap-1.5 items-center">
                              <span className="text-[8px] font-mono bg-emerald-600/10 text-emerald-400 border border-emerald-500/10 px-2 py-0.5 rounded uppercase tracking-wider italic">
                                {img.category}
                              </span>
                              {img.isCustom && (
                                <span className="text-[8px] font-mono bg-stone-800 text-stone-300 px-1.5 py-0.5 rounded">
                                  Customizada
                                </span>
                              )}
                              {isRemoteUnsplash && (
                                <span className="text-[8px] font-mono bg-yellow-500/10 text-yellow-400 border border-yellow-500/10 px-1.5 py-0.5 rounded">
                                  Link Externo
                                </span>
                              )}
                            </div>
                            
                            <h4 className="font-display font-bold text-xs md:text-sm text-white truncate mt-1">
                              {img.name}
                            </h4>
                            <p className="text-[10px] text-stone-400 leading-tight block truncate mt-0.5">
                              {img.description || 'Nenhuma descrição detalhada fornecida.'}
                            </p>

                            {editingId === img.id ? (
                              /* Submitting replace overlay */
                              <div className="mt-2 text-left space-y-1.5 bg-stone-900 p-2 rounded-sm border border-stone-800">
                                <span className="text-[9px] font-mono text-stone-500 block uppercase font-bold">Substituir Arquivo da Imagem:</span>
                                
                                <div className="space-y-1">
                                  {isReplacing ? (
                                    <div className="text-[10px] text-emerald-400 font-mono animate-pulse">Fazendo upload substitutivo...</div>
                                  ) : (
                                    <div className="relative flex items-center justify-center bg-stone-950 border border-dashed border-stone-800 hover:border-emerald-500 rounded-sm p-2.5 cursor-pointer text-center">
                                      <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleUploadReplacementFile(e, img.id)}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        disabled={isReplacing}
                                      />
                                      <span className="text-[9px] uppercase font-bold tracking-wider text-stone-450 hover:text-white flex items-center gap-1">
                                        <Upload className="h-3 w-3" /> Enviar Novo Arquivo
                                      </span>
                                    </div>
                                  )}
                                </div>

                                <div className="text-[9px] text-stone-600 text-center font-mono my-0.5">OU COLAR ENDEREÇO URL</div>

                                <input
                                  type="url"
                                  value={editingUrl}
                                  onChange={(e) => setEditingUrl(e.target.value)}
                                  placeholder="Novo link de imagem..."
                                  className="w-full bg-stone-950 border border-stone-800 text-white rounded p-1 text-[11px] focus:outline-none focus:border-emerald-550"
                                  autoFocus
                                />
                                <div className="flex items-center gap-2 pt-1">
                                  <button
                                    onClick={() => handleReplaceImageUrl(img.id)}
                                    disabled={isReplacing}
                                    className="bg-emerald-600 text-white px-2.5 py-1 rounded-sm text-[10px] font-bold flex items-center gap-1 hover:bg-emerald-700 transition"
                                  >
                                    <Save className="h-3 w-3" /> Gravar Alteração
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
                                  className="inline-flex items-center gap-1 text-[11px] text-emerald-500 hover:text-emerald-400 font-bold uppercase tracking-wider italic cursor-pointer btn-editor-trigger"
                                >
                                  <RefreshCw className="h-3 w-3" /> Substituir Mídia
                                </button>
                                {img.isCustom ? (
                                  <button
                                    onClick={() => handleRemoveImage(img.id, img.isCustom)}
                                    className="inline-flex items-center gap-1 text-[11px] text-stone-550 hover:text-red-500 transition-colors uppercase cursor-pointer"
                                    title="Remover mídia customizada permanentemente"
                                  >
                                    <Trash2 className="h-3 w-3" /> Remover
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleResetImage(img.id)}
                                    className="inline-flex items-center gap-1 text-[11px] text-stone-550 hover:text-red-500 transition-colors uppercase cursor-pointer"
                                    title="Remover foto enviada e restaurar original"
                                  >
                                    <Trash2 className="h-3 w-3" /> Remover/Redefinir
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

              </div>

              {/* Status information footer of dashboard */}
              <div className="pt-4 border-t border-stone-850 mt-4 flex flex-col md:flex-row items-start md:items-center justify-between text-[11px] text-stone-550 gap-2">
                <p>💡 Os uploads são salvos diretamente no seu Supabase Storage e entram no ar imediatamente.</p>
                <p className="font-mono text-[10px] uppercase font-bold">Total indexado: {images.length}</p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
