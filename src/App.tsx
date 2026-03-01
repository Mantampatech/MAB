/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  X, 
  Instagram, 
  Youtube, 
  Facebook, 
  Mail, 
  Phone, 
  MapPin, 
  Star, 
  ChevronRight, 
  ArrowRight,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { Page, EBook, BlogPost } from './types';

// --- Mock Data ---
const featuredEBooks: EBook[] = [
  { id: '1', title: 'Guide des Fruits Rouges', price: 49.90, image: 'https://images.unsplash.com/photo-1518635017498-87af514b77ad?auto=format&fit=crop&q=80&w=400', rating: 5, category: 'Fruits' },
  { id: '2', title: 'Légumes qui Guérissent', price: 59.90, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400', rating: 4, category: 'Légumes' },
  { id: '3', title: 'Nutrition Fonctionnelle Quotidienne', price: 67.00, image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400', rating: 5, category: 'Nutrition' },
];

const storeEBooks: EBook[] = [
  ...featuredEBooks,
  { id: '4', title: 'Le Pouvoir de la Mandarine', price: 35.00, image: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&q=80&w=400', rating: 5, category: 'Fruits' },
  { id: '5', title: 'Alimentation Alcaline', price: 89.90, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=400', rating: 4, category: 'Nutrition' },
  { id: '6', title: 'Verts Essentiels', price: 42.00, image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&q=80&w=400', rating: 5, category: 'Légumes' },
  { id: '7', title: 'Recettes Detox', price: 55.00, image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&q=80&w=400', rating: 4, category: 'Recettes' },
  { id: '8', title: 'Supplémentation Naturelle', price: 74.90, image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=400', rating: 5, category: 'Nutrition' },
  { id: '9', title: 'Jus Pressés à Froid', price: 29.90, image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=400', rating: 5, category: 'Recettes' },
  { id: '10', title: 'Légumineuses et Graines', price: 45.00, image: 'https://images.unsplash.com/photo-1515942400420-2b98fed1f515?auto=format&fit=crop&q=80&w=400', rating: 4, category: 'Nutrition Fonctionnelle' },
];

const blogPosts: BlogPost[] = [
  { id: '1', title: 'Fruits Frais de Saison', category: 'Fruits Tropicaux', excerpt: 'Découvrez quels fruits sont au sommet de leur valeur nutritionnelle ce mois-ci et comment en profiter.', image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&q=80&w=600', date: '15 Mar 2024' },
  { id: '2', title: 'Crucifères et Protéines', category: 'Légumes', excerpt: 'Le rôle fondamental du brocoli et du chou-fleur dans votre alimentation protéinée végétale.', image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?auto=format&fit=crop&q=80&w=600', date: '12 Mar 2024' },
  { id: '3', title: 'Arbres Fruitiers à la Maison', category: 'Potager', excerpt: 'Comment cultiver de petits citronniers et orangers même en appartement.', image: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&q=80&w=600', date: '10 Mar 2024' },
  { id: '4', title: 'Mandarine et Vitamine C', category: 'Fruits', excerpt: 'Pourquoi la mandarine est la reine de l\'hiver et comment elle protège votre immunité.', image: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&q=80&w=600', date: '08 Mar 2024' },
  { id: '5', title: 'Alimentation Alcaline', category: 'Nutrition', excerpt: 'Équilibrer le pH de votre corps grâce à des choix alimentaires conscients.', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600', date: '05 Mar 2024' },
  { id: '6', title: 'Légumes Verts Foncés', category: 'Légumes', excerpt: 'Le secret du fer et du magnésium caché dans les feuilles d\'épinards et de chou frisé.', image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&q=80&w=600', date: '02 Mar 2024' },
];

// --- Components ---

const Navbar = ({ currentPage, setPage }: { currentPage: Page, setPage: (p: Page) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-bege/90 backdrop-blur-md z-50 border-b border-verde-escuro/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center cursor-pointer" onClick={() => setPage('home')}>
            <span className="text-2xl font-serif font-bold text-verde-escuro tracking-tight">Olerisens</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => setPage('home')} className={`nav-link ${currentPage === 'home' ? 'text-verde-medio after:w-full' : ''}`}>Accueil</button>
            <button onClick={() => setPage('blog')} className={`nav-link ${currentPage === 'blog' ? 'text-verde-medio after:w-full' : ''}`}>Blog</button>
            <button onClick={() => setPage('store')} className={`nav-link ${currentPage === 'store' ? 'text-verde-medio after:w-full' : ''}`}>Boutique</button>
            <button onClick={() => setPage('contact')} className={`nav-link ${currentPage === 'contact' ? 'text-verde-medio after:w-full' : ''}`}>Contact</button>
          </div>

          <div className="hidden md:flex items-center space-x-5">
            <Search className="w-5 h-5 text-verde-escuro cursor-pointer hover:text-verde-medio transition-colors" />
            <div className="relative cursor-pointer group">
              <ShoppingCart className="w-5 h-5 text-verde-escuro group-hover:text-verde-medio transition-colors" />
              <span className="absolute -top-2 -right-2 bg-verde-medio text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">0</span>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-verde-escuro">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bege border-b border-verde-escuro/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              <button onClick={() => { setPage('home'); setIsOpen(false); }} className="block w-full text-left py-2 text-verde-escuro font-medium">Accueil</button>
              <button onClick={() => { setPage('blog'); setIsOpen(false); }} className="block w-full text-left py-2 text-verde-escuro font-medium">Blog</button>
              <button onClick={() => { setPage('store'); setIsOpen(false); }} className="block w-full text-left py-2 text-verde-escuro font-medium">Boutique</button>
              <button onClick={() => { setPage('contact'); setIsOpen(false); }} className="block w-full text-left py-2 text-verde-escuro font-medium">Contact</button>
              <div className="flex space-x-4 pt-4 border-t border-verde-escuro/10">
                <Search className="w-5 h-5 text-verde-escuro" />
                <ShoppingCart className="w-5 h-5 text-verde-escuro" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ setPage }: { setPage: (p: Page) => void }) => (
  <footer className="bg-verde-escuro text-bege pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-2xl font-serif font-bold mb-6">Olerisens</h3>
          <p className="text-bege/70 mb-6">Votre voyage vers une vie plus saine commence par la bonne connaissance de ce que vous mettez dans votre assiette.</p>
          <div className="flex space-x-4">
            <Instagram className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            <Youtube className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            <Facebook className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-wider text-sm">Liens Rapides</h4>
          <ul className="space-y-4">
            <li><button onClick={() => setPage('home')} className="hover:text-white transition-colors">Accueil</button></li>
            <li><button onClick={() => setPage('blog')} className="hover:text-white transition-colors">Blog</button></li>
            <li><button onClick={() => setPage('store')} className="hover:text-white transition-colors">Boutique d'eBooks</button></li>
            <li><button onClick={() => setPage('contact')} className="hover:text-white transition-colors">Contact</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-wider text-sm">Catégories</h4>
          <ul className="space-y-4">
            <li><a href="#" className="hover:text-white transition-colors">Nutrition Générale</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Guide des Fruits</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Légumes et Santé</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Recettes Saines</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 uppercase tracking-wider text-sm">Newsletter</h4>
          <p className="text-bege/70 mb-4">Recevez des conseils en nutrition et des offres exclusives.</p>
          <div className="flex">
            <input type="email" placeholder="Votre e-mail" className="bg-white/10 border border-white/20 rounded-l-full px-4 py-2 w-full focus:outline-none focus:border-white/40" />
            <button className="bg-bege text-verde-escuro px-4 py-2 rounded-r-full hover:bg-white transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 pt-8 text-center text-sm text-bege/50">
        <p>&copy; {new Date().getFullYear()} Olerisens. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
);

const HomePage = ({ setPage }: { setPage: (p: Page) => void }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    {/* Hero Section */}
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=1920" 
          alt="Fruits et légumes frais" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Votre Guide Complet de Nutrition
        </motion.h1>
        <motion.p 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-white/90 mb-10 max-w-2xl mx-auto"
        >
          Découvrez le pouvoir des aliments naturels à travers nos eBooks spécialisés. Transformez votre santé avec la sagesse de la terre.
        </motion.p>
        <motion.button 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={() => setPage('store')}
          className="btn-primary text-lg px-10 py-4"
        >
          Explorer les eBooks
        </motion.button>
      </div>
    </section>

    {/* Destaques */}
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">EBooks à la Une</h2>
        <p className="text-center text-texto/60 mb-16 max-w-2xl mx-auto">Nos publications les plus lues et recommandées par des experts en nutrition.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredEBooks.map((ebook) => (
            <div key={ebook.id} className="card group">
              <div className="aspect-[3/4] overflow-hidden relative">
                <img src={ebook.image} alt={ebook.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute top-4 right-4 bg-verde-escuro text-white px-3 py-1 rounded-full text-sm font-bold">
                  {ebook.price.toFixed(2)} €
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  {[...Array(ebook.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <h3 className="text-xl font-bold text-verde-escuro mb-4">{ebook.title}</h3>
                <button onClick={() => setPage('store')} className="text-verde-medio font-bold flex items-center hover:translate-x-2 transition-transform">
                  Voir Détails <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Banner Motivacional */}
    <section className="py-20 bg-bege-escuro overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1550583724-b26cc28df5d1?auto=format&fit=crop&q=80&w=800" 
              alt="Pomme et feuilles vertes" 
              className="rounded-3xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-verde-escuro mb-6">La Nature est votre Meilleure Pharmacie</h2>
            <p className="text-lg text-texto/80 mb-8">Chaque fruit et légume porte en lui des composés bioactifs capables de régénérer et de protéger votre organisme. Apprenez à utiliser ces ressources à votre avantage.</p>
            <button onClick={() => setPage('blog')} className="btn-secondary">Lire les Articles du Blog</button>
          </div>
        </div>
      </div>
    </section>

    {/* Por que Olerisens */}
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Pourquoi Olerisens ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-bege rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-verde-escuro" />
            </div>
            <h3 className="text-xl font-bold mb-4">Contenu Spécialisé</h3>
            <p className="text-texto/60">Nos eBooks sont écrits par des nutritionnistes et des experts en botanique alimentaire.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-bege rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-verde-escuro" />
            </div>
            <h3 className="text-xl font-bold mb-4">Focus sur la Pratique</h3>
            <p className="text-texto/60">Des guides directs, avec des tableaux nutritionnels et des conseils pratiques de consommation.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-bege rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-verde-escuro" />
            </div>
            <h3 className="text-xl font-bold mb-4">Accès à Vie</h3>
            <p className="text-texto/60">Achetez une fois et profitez d'un accès illimité sur n'importe quel appareil numérique.</p>
          </div>
        </div>
      </div>
    </section>
  </motion.div>
);

const BlogPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 pb-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif font-bold text-verde-escuro mb-4">Blog de Nutrition</h1>
        <p className="text-texto/60 max-w-2xl mx-auto">Articles hebdomadaires sur l'univers des fruits, des légumes et des habitudes saines.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="lg:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="card group">
                <div className="aspect-video overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                </div>
                <div className="p-6">
                  <span className="text-verde-medio text-xs font-bold uppercase tracking-widest mb-2 block">{post.category}</span>
                  <h3 className="text-xl font-bold text-verde-escuro mb-3 group-hover:text-verde-medio transition-colors">{post.title}</h3>
                  <p className="text-texto/60 text-sm mb-6 line-clamp-2">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-texto/40">{post.date}</span>
                    <button className="text-verde-escuro font-bold text-sm flex items-center hover:translate-x-1 transition-transform">
                      Lire la Suite <ChevronRight className="ml-1 w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-16 flex justify-center space-x-2">
            <button className="w-10 h-10 rounded-full bg-verde-escuro text-white flex items-center justify-center font-bold">1</button>
            <button className="w-10 h-10 rounded-full bg-white text-verde-escuro border border-verde-escuro/10 flex items-center justify-center font-bold hover:bg-bege transition-colors">2</button>
            <button className="w-10 h-10 rounded-full bg-white text-verde-escuro border border-verde-escuro/10 flex items-center justify-center font-bold hover:bg-bege transition-colors">3</button>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:w-1/3 space-y-12">
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h4 className="font-serif font-bold text-xl text-verde-escuro mb-6">Rechercher</h4>
            <div className="relative">
              <input type="text" placeholder="Rechercher des articles..." className="w-full bg-bege border-none rounded-full px-6 py-3 focus:ring-2 focus:ring-verde-medio outline-none" />
              <Search className="absolute right-4 top-3.5 w-5 h-5 text-verde-escuro/40" />
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <h4 className="font-serif font-bold text-xl text-verde-escuro mb-6">Catégories</h4>
            <ul className="space-y-4">
              {['Fruits', 'Légumes', 'Recettes', 'Suppléments', 'Potager à la Maison'].map((cat) => (
                <li key={cat} className="flex justify-between items-center group cursor-pointer">
                  <span className="text-texto/70 group-hover:text-verde-medio transition-colors">{cat}</span>
                  <span className="bg-bege text-verde-escuro text-xs font-bold px-2 py-1 rounded-md">12</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-verde-escuro p-8 rounded-2xl text-bege">
            <h4 className="font-serif font-bold text-xl mb-4">EBook à la Une</h4>
            <img src={featuredEBooks[0].image} alt="Destaque" className="rounded-xl mb-6 aspect-[3/4] object-cover" referrerPolicy="no-referrer" />
            <h5 className="font-bold mb-2">{featuredEBooks[0].title}</h5>
            <p className="text-sm text-bege/70 mb-6">Apprenez tout sur les super-fruits et comment ils peuvent changer votre vie.</p>
            <button className="w-full bg-bege text-verde-escuro py-3 rounded-full font-bold hover:bg-white transition-colors">Acheter Maintenant</button>
          </div>
        </aside>
      </div>
    </div>
  </motion.div>
);

const StorePage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 pb-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif font-bold text-verde-escuro mb-4">Boutique d'eBooks</h1>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {['Tous', 'Fruits', 'Légumes', 'Recettes', 'Nutrition Fonctionnelle'].map((cat, i) => (
            <button key={cat} className={`px-6 py-2 rounded-full font-medium transition-all ${i === 0 ? 'bg-verde-escuro text-white' : 'bg-white text-verde-escuro border border-verde-escuro/10 hover:bg-bege'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="lg:w-1/4 hidden lg:block">
          <div className="bg-white p-8 rounded-2xl shadow-sm sticky top-32">
            <h4 className="font-serif font-bold text-xl text-verde-escuro mb-8 flex items-center">
              <Filter className="mr-2 w-5 h-5" /> Filtres
            </h4>
            
            <div className="mb-8">
              <h5 className="font-bold text-sm uppercase tracking-widest mb-4">Catégories</h5>
              <div className="space-y-3">
                {['Fruits', 'Légumes', 'Recettes', 'Nutrition Fonctionnelle', 'Santé Mentale'].map((cat) => (
                  <label key={cat} className="flex items-center cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-verde-escuro/20 text-verde-escuro focus:ring-verde-medio" />
                    <span className="ml-3 text-texto/70 group-hover:text-verde-medio transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h5 className="font-bold text-sm uppercase tracking-widest mb-4">Prix</h5>
              <input type="range" className="w-full accent-verde-escuro" />
              <div className="flex justify-between text-xs text-texto/40 mt-2">
                <span>0 €</span>
                <span>200 €</span>
              </div>
            </div>

            <div className="bg-verde-medio/10 p-6 rounded-xl">
              <h5 className="font-bold text-verde-escuro mb-2">Offre Spéciale</h5>
              <p className="text-xs text-verde-escuro/70 mb-4">Achetez 2 eBooks et recevez le 3ème gratuitement !</p>
              <button className="text-verde-escuro font-bold text-xs underline">Voir les Règles</button>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {storeEBooks.map((ebook) => (
              <div key={ebook.id} className="card group">
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img src={ebook.image} alt={ebook.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-verde-escuro px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    {ebook.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < ebook.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-verde-escuro mb-4 h-14 line-clamp-2">{ebook.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-verde-escuro">{ebook.price.toFixed(2)} €</span>
                    <button className="bg-verde-escuro text-white p-2 rounded-full hover:bg-verde-medio transition-colors">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                  <button className="w-full mt-6 btn-primary py-2 text-sm">Acheter Maintenant</button>
                </div>
              </div>
            ))}
          </div>

          {/* Featured eBook Section */}
          <div className="mt-20 bg-verde-escuro rounded-3xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800" alt="Destaque" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="md:w-1/2 p-12 flex flex-col justify-center">
              <span className="text-bege/50 text-xs font-bold uppercase tracking-widest mb-4">Lancement du Mois</span>
              <h2 className="text-3xl font-serif font-bold text-white mb-6">Le Guide Définitif des Légumes qui Guérissent</h2>
              <p className="text-bege/70 mb-8">Un manuel complet de plus de 200 pages sur la façon de traiter les conditions courantes grâce à une alimentation axée sur des légumes spécifiques.</p>
              <div className="flex items-center space-x-6">
                <span className="text-3xl font-bold text-bege">59,90 €</span>
                <button className="bg-bege text-verde-escuro px-8 py-3 rounded-full font-bold hover:bg-white transition-colors">Je le veux !</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const ContactPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 pb-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif font-bold text-verde-escuro mb-4">Contactez-nous</h1>
        <p className="text-texto/60 max-w-2xl mx-auto">Vous avez des questions sur nos eBooks ou vous souhaitez établir un partenariat ? Nous sommes à votre écoute.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Form */}
        <div className="bg-white p-10 rounded-3xl shadow-sm">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-verde-escuro mb-2">Nom Complet</label>
                <input type="text" className="w-full bg-bege border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-verde-medio outline-none" placeholder="Votre nom" />
              </div>
              <div>
                <label className="block text-sm font-bold text-verde-escuro mb-2">E-mail</label>
                <input type="email" className="w-full bg-bege border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-verde-medio outline-none" placeholder="votre@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-verde-escuro mb-2">Sujet</label>
              <select className="w-full bg-bege border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-verde-medio outline-none appearance-none">
                <option>Questions sur les eBooks</option>
                <option>Partenariat</option>
                <option>Support Technique</option>
                <option>Autres</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-verde-escuro mb-2">Message</label>
              <textarea rows={5} className="w-full bg-bege border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-verde-medio outline-none resize-none" placeholder="Comment pouvons-nous vous aider ?"></textarea>
            </div>
            <button type="submit" className="w-full btn-primary py-4 text-lg">Envoyer le Message</button>
          </form>
        </div>

        {/* Contact Info & FAQ */}
        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-verde-escuro p-8 rounded-2xl text-bege">
              <Mail className="w-8 h-8 mb-4 text-bege/50" />
              <h4 className="font-bold mb-2">E-mail</h4>
              <p className="text-sm text-bege/70">contact@olerisens.fr</p>
            </div>
            <div className="bg-verde-medio p-8 rounded-2xl text-bege">
              <Phone className="w-8 h-8 mb-4 text-bege/50" />
              <h4 className="font-bold mb-2">Téléphone</h4>
              <p className="text-sm text-bege/70">+33 (0) 1 23 45 67 89</p>
            </div>
            <div className="bg-bege-escuro p-8 rounded-2xl text-verde-escuro md:col-span-2">
              <MapPin className="w-8 h-8 mb-4 text-verde-escuro/30" />
              <h4 className="font-bold mb-2">Heures d'Ouverture</h4>
              <p className="text-sm text-verde-escuro/70">Lundi au Vendredi : 09:00 à 18:00</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-serif font-bold text-verde-escuro mb-8">Questions Fréquentes</h3>
            <div className="space-y-6">
              {[
                { q: "Comment recevoir mon eBook après l'achat ?", a: "Immédiatement après la confirmation du paiement, vous recevrez un lien de téléchargement sur votre e-mail enregistré." },
                { q: "Puis-je lire sur mon Kindle ?", a: "Oui ! Nos eBooks sont disponibles dans des formats compatibles avec Kindle, tablettes et smartphones." },
                { q: "Existe-t-il une garantie de satisfaction ?", a: "Oui, nous offrons une garantie inconditionnelle de 7 jours pour tous nos produits numériques." }
              ].map((faq, i) => (
                <div key={i} className="border-b border-verde-escuro/10 pb-6">
                  <h4 className="font-bold text-verde-escuro mb-2">{faq.q}</h4>
                  <p className="text-sm text-texto/60">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function App() {
  const [page, setPage] = useState<Page>('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={page} setPage={setPage} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {page === 'home' && <HomePage setPage={setPage} />}
          {page === 'blog' && <BlogPage />}
          {page === 'store' && <StorePage />}
          {page === 'contact' && <ContactPage />}
        </AnimatePresence>
      </main>

      <Footer setPage={setPage} />
    </div>
  );
}
