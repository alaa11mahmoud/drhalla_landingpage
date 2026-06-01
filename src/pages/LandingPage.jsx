import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import VideoPlayerModal from '../components/VideoPlayerModal';
import cert1 from '../assets/certificates/1.jpeg';
import cert2 from '../assets/certificates/2.jpeg';
import cert3 from '../assets/certificates/3.jpeg';
import cert4 from '../assets/certificates/4.jpeg';
import cert5 from '../assets/certificates/5.jpeg';
import cert6 from '../assets/certificates/6.jpeg';
import cert7 from '../assets/certificates/7.jpeg';
import cert8 from '../assets/certificates/8.jpeg';
import cert9 from '../assets/certificates/9.jpeg';
import cert10 from '../assets/certificates/10.jpeg';
import heroImage from '../assets/hero.png';

const WHATSAPP_NUMBER = '201207273558';
const INITIAL_VIDEOS = 3;

const aboutData = {
  title: 'د. هالة',
  content: 'أهلاً بكم، أنا د. هالة حسن الغباري، استشارية الصحة النفسية والإرشاد الأسري وتعديل السلوك. من واقع دراستي وحصولي على الدكتوراه المهنية من المملكة المتحدة، واعتمادي من اتحاد المعالجين النفسيين العرب، أكرس خبرتي لمساعدتكم في تجاوز التحديات النفسية وبناء حياة أسرية متوازنة. رحلتكم نحو السلام النفسي وتبني سلوكيات إيجابية تبدأ من هنا',
  image_url: heroImage,
  stats: [
    { value: '3+', label: 'سنوات خبرة' },
    { value: '1800+',label: 'جلسة علاجية' },
    { value: '1500+', label: 'مستفيد' },
  ],
};

const videosData = [
  {
    id: 1,
    title: 'جلسة رحله بين الثقافات',
    description: ' ماذا يحدث عندما يجتمع الصينيون و المصريون في جلسه ثيرابي واحدهلتبادل الثقافات و فهم اعمق للمشاعر',
    url: 'https://youtube.com/shorts/Zf4riR8FMrE?feature=share',
    file_url: null,
    cover_url: null,
  },
  {
    id: 2,
    title: ' جلسه مع شباب الجامعه',
    description: 'تمارين استرخاء موجهة  على النوم',
    url: 'https://youtube.com/shorts/X8wzL9F-OVs?feature=share',
    file_url: null,
    cover_url: null,
  },
  {
    id: 3,
    title: ' بعض الانجازات',
    description: ' كل محطه في الرحله ليها قيمتها',
    url: 'https://youtube.com/shorts/SLW8ekf_zf8?feature=share',
    file_url: null,
    cover_url: null,
  },
  {
    id: 4,
    title: 'المؤتمر العلمي الاقليمي',
    description: 'المؤتمر العلمي الاقليمي للصحه النفسيه و المسانده و الدعم النفسي ورؤيه 2030',
    url: 'https://youtube.com/shorts/XL4chYKl-l8?feature=share',
    file_url: null,
    cover_url: null,
  },
  {
    id: 5,
    title: 'ثيرابي ترميم الروح',
    description: ' لترميم الروح في رمضان',
    url: 'https://youtube.com/shorts/IJrhoq76Q0k?feature=share',
    file_url: null,
    cover_url: null,
  },
  {
    id: 6,
    title: ' السكوت عن الحق',
    description: 'في بنات كتير اتعرضو للتحرش ة سكتو و الاثر لسه موجود جواهم السكوت وقتها كان وسيله نجاه و خوف بس الوقتي جه وقت الشفاء',
    url: 'https://youtube.com/shorts/WTBXmh2GujI?feature=share',
    file_url: null,
    cover_url: null,
  },
  {
    id: 7,
    title: ' ايفنت take abreath',
    description: 'يوم مليان طاقه و حيويه وتفاعل ',
    url: 'https://youtube.com/shorts/bTwkVunmNas?feature=share',
    file_url: null,
    cover_url: null,
  },
  {
    id: 8,
    title: ' مراحل الحزن',
    description: 'مراحل الحزن 5 فهمك لكل مرحله دا هيساعدك تفهم نفسك اكتر وتفهم شعورك',
    url: 'https://youtube.com/shorts/1VCqyb-bEpU?feature=share',
    file_url: null,
    cover_url: null,
  },
];

const certificationsData = [
  {
    id: 1,
    title: 'دكتوراه مهنية في الصحة النفسية والإرشاد الأسري',
    issuer: 'Stanford College',
    issue_date: '2025-01-20',
    description: 'شهادة إنجاز وتفوق تقدير امتياز مع مرتبة الشرف (An Excellent with Honors)، وذلك بعد إتمامها بنجاح لبرنامج دراسي متخصص واجتياز الامتحانات المقررة واستيفاء كافة المعايير المطلوبة للحصول على هذه الدرجة العلمية',
    image_url: cert1,
  },
  {
    id: 2,
    title: 'دبلومة مهنية في علاج معرفي سلوكي',
    issuer: 'الأكاديمية البريطانية العربية',
    issue_date: '2025-06-20',
    description: 'شهادة بالحصول على الدبلومة المهنية في علاج معرفي سلوكي بتقدير امتياز معتمد من الأكاديمية البريطانية العربية',
    image_url: cert2,
  },
  {
    id: 3,
    title: 'بيان درجات الدكتوراة المهنية في الصحة النفسية والإرشاد الأسري',
    issuer: 'كلية ستانفورد للتعليم المهني بالمملكة المتحدة',
    issue_date: '2025-01-20',
    description: 'سجل أكاديمي رسمي يوضح درجات المواد الدراسية مثل الصحة النفسية، الدعم النفسي، والاضطرابات النفسية بتقدير عام ممتاز وبنسبة تخرج خمسة وتسعين ونصف بالمئة',
    image_url: cert3,
  },
  {
    id: 4,
    title: 'إفادة اعتماد استشاري صحة نفسية وإرشاد أسري',
    issuer: 'اللجنة العامة للعلوم الإنسانية بالتعاون مع البورد البريطاني الدولي ووزارة التضامن الاجتماعي',
    issue_date: '2025-01-20',
    description: 'إفادة رسمية تفيد باعتماد السيدة هالة حسن حسن الغباري كاستشاري صحة نفسية وإرشاد أسري ومسجلة برقم قيد ثلاثمئة وخمسة وتسعين لعام ألفين وخمسة عشر',
    image_url: cert4,
  },
  {
    id: 5,
    title: 'شهادة اعتماد مهني استشاري صحة نفسية وإرشاد أسري',
    issuer: 'اتحاد المعالجين النفسيين العرب',
    issue_date: '2025-09-01',
    description: 'رخصة اعتماد مهني للعمل كاستشاري صحة نفسية وإرشاد أسري صادرة بموجب استيفاء كافة الشروط ومتطلبات الحصول على الترخيص والشهادة صالحة حتى ثلاثين من أغسطس لعام ألفين وستة وثلاثين',
    image_url: cert5,
  },
  {
    id: 6,
    title: 'دكتوراة مهنية في الصحة النفسية والإرشاد الأسري',
    issuer: 'البورد البريطاني',
    issue_date: '2025-01-20',
    description: 'شهادة إنجاز تمنح درجة الدكتوراة المهنية في الصحة النفسية والإرشاد الأسري بعد إتمام مئة وخمسين ساعة تدريبية معتمدة بتقدير ممتاز',
    image_url: cert6,
  },
  {
    id: 7,
    title: 'الدبلومة التدريبية في تعديل السلوك',
    issuer: 'مركز العهد للتدريب ووحدة التعليم والتدريب بموجب ترخيص رسمي وباعتماد وزارة التجارة والصناعة ووزارة الاستثمار والتعاون الدولي',
    issue_date: '2026-04-05',
    description: 'شهادة باجتياز الدبلومة التدريبية في تعديل السلوك بنجاح بإجمالي عدد ساعات أربعين ساعة تدريبية شاملة التدريبات النظرية والعملية في الفترة من منتصف فبراير وحتى أول أبريل لعام ألفين وستة وعشرين',
    image_url: cert7,
  },
  {
    id: 8,
    title: 'البرنامج التدريبي في التربية الجنسية',
    issuer: 'مركز العهد للتدريب ووحدة التعليم والتدريب وباعتماد رسمي من وزارة التجارة والصناعة ووزارة الاستثمار والتعاون الدولي',
    issue_date: '2026-02-24',
    description: 'شهادة باجتياز البرنامج التدريبي في التربية الجنسية بنجاح بإجمالي عدد ساعات عشر ساعات تدريبية نظرية وعملية في الفترة من العشرين وحتى الرابع والعشرين من فبراير لعام ألفين وستة وعشرين',
    image_url: cert8,
  },
  {
    id: 9,
    title: 'شهادة تدريب إداري في دبلومة تعديل السلوك',
    issuer: 'مركز العهد للتدريب وتنمية الموارد البشرية بالتعاون مع مركز القاهرة لتنمية الموارد البشرية بمحافظة القاهرة',
    issue_date: '2026-04-05',
    description: 'شهادة باجتياز الدبلومة التدريبية الإدارية في تعديل السلوك بواقع أربعين ساعة تدريبية في الفترة من منتصف فبراير وحتى أول أبريل لعام ألفين وستة وعشرين',
    image_url: cert9,
  },
  {
    id: 10,
    title: 'البرنامج التدريبي في أنواع الأطفال',
    issuer: 'مركز العهد للتدريب ووحدة التعليم والتدريب وباعتماد رسمي من وزارة التجارة والصناعة ووزارة الاستثمار والتعاون الدولي',
    issue_date: '2026-03-02',
    description: 'شهادة باجتياز البرنامج التدريبي في أنواع الأطفال بنجاح بإجمالي عدد ساعات عشر ساعات تدريبية تشمل الجوانب النظرية والعملية في الفترة من السادس والعشرين من فبراير وحتى الثاني من مارس لعام ألفين وستة وعشرين',
    image_url: cert10,
  },
];

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.scroll-reveal');
    if (els.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}

function SectionTitle({ subtitle, title, desc }) {
  return (
    <div className="text-center mb-14 scroll-reveal scroll-reveal-up">
      <span className="text-sage font-bold text-sm tracking-widest uppercase">{subtitle}</span>
      <h2 className="text-3xl md:text-4xl font-heading font-black text-forest mt-2">{title}</h2>
      {desc && <p className="text-forest/60 mt-3 max-w-xl mx-auto">{desc}</p>}
    </div>
  );
}

function PlayIcon({ className = 'text-white' }) {
  return (
    <svg className={`w-6 h-6 ${className}`} fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function getYoutubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

function VideoCard({ video, idx }) {
  const videoUrl = video.file_url || video.url;
  const youtubeId = getYoutubeId(videoUrl);
  const thumb = youtubeId
    ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
    : video.cover_url || null;

  return (
    <div className="scroll-reveal scroll-reveal-up bg-cream rounded-2xl overflow-hidden shadow-sm card-hover" style={{ transitionDelay: `${idx * 100}ms` }}>
      <div className="block">
        <div className="relative h-48 bg-gradient-to-br from-sage/30 to-forest/30 overflow-hidden">
          {thumb ? (
            <img src={thumb} alt={video.title} className="w-full h-full object-cover" loading="lazy" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <PlayIcon className="w-12 h-12 text-white/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer">
              <PlayIcon className="text-forest w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-forest">{video.title}</h3>
        {video.description && (
          <p className="text-forest/60 text-sm mt-1 line-clamp-2">{video.description}</p>
        )}
      </div>
    </div>
  );
}

function CertificateCard({ cert, idx }) {
  const direction = idx % 2 === 0 ? 'scroll-reveal-right' : 'scroll-reveal-left';
  return (
    <div className={`scroll-reveal ${direction} bg-white rounded-2xl p-6 shadow-sm card-hover flex gap-5 items-start`} style={{ transitionDelay: `${idx * 120}ms` }}>
      <div className="w-20 h-20 rounded-xl bg-sage/10 flex-shrink-0 overflow-hidden flex items-center justify-center">
        {cert.image_url ? (
          <img src={cert.image_url} alt={cert.title} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-forest text-base">{cert.title}</h3>
        <p className="text-sage text-sm">{cert.issuer || ''}</p>
        {cert.issue_date && <p className="text-coral text-xs mt-1">{new Date(cert.issue_date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</p>}
        {cert.description && <p className="text-forest/70 text-sm mt-2 leading-relaxed">{cert.description}</p>}
      </div>
    </div>
  );
}

export default function LandingPage() {
  const { t } = useTranslation();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const videos = videosData;
  const about = aboutData;
  const certifications = certificationsData;

  const displayVideos = [...videos];
  if (videos.length > 0) {
    while (displayVideos.length < 8) {
      displayVideos.push(...videos);
    }
    if (displayVideos.length > 12) {
      displayVideos.length = 12;
    }
  }

  const carouselColors = ['#4a2c4a', '#c48a8a', '#3a3a3a', '#c47a5a', '#2d4c2d', '#8a6a4a', '#5a3a5a'];

  const testimonials = [
    {
      name: 'هاجر ',
      role: 'جلسه تعديل السلوك',
      review: 'انا بشكر حضرتك جدا المحاضرة كانت ممتعه ومفيدة جدا بس زعلانه ان انا محضرتش محاضره امبارح انشاء الله تتعوض لما تعيدي الكورس في انتظارك',
      avatar: null,
    },
    {
      name: 'اميرة ',
      role: 'ثيرابي ترميم الروح',
      review: 'انا بجد فخورة بحضرتك جدا زادني شرف معرفتك والله وبكلامك وحكمتك وطرقة عرضك للمعلومة وتبسيطها وهدوءك الجميل ربنا يزيدك علم ومعرفة وفهم ويرفع قدرك ويعلي شأنك اللهم آمين',
      avatar: null,
    },
    {
      name: 'اسماء ',
      role: 'كورس مفاتيح ابنك في ايدك',
      review: 'اتبسط جدا في الكورس طريقه حضرتك كانت بسيطه جدا وصلت المعلومه بسهوله كل نقطه كانت واضحه وحسيت فعلا بفرق كبير في تفكيري من بعد كلام حضرتك بجد ياريت تكوني معانا دايما وتعملي محاضره كل فتره بجد انا كنت مفتقداكي في حياتي ربنا يجعله في ميزان حسناتك يارب',
      avatar: null,
    },
  ];

  useScrollReveal();

  return (
    <div className="overflow-hidden bg-cream">
      <section id="home" className="relative bg-forest min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-forest/90 to-forest" />
        <div className="absolute top-20 -left-20 w-96 h-96 bg-sage/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 right-20 w-80 h-80 bg-sage/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 text-center lg:text-right">

              <h1 className="scroll-reveal scroll-reveal-up text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white leading-tight mb-6" style={{ transitionDelay: '100ms' }}>
                {about?.title || t('landing.fallback_title')}
              </h1>
              <p className="scroll-reveal scroll-reveal-up text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto lg:mr-0 mb-8" style={{ transitionDelay: '200ms' }}>
                {about?.content || t('landing.fallback_content')}
              </p>

              <div className="scroll-reveal scroll-reveal-up flex flex-col sm:flex-row gap-3 justify-center lg:justify-start" style={{ transitionDelay: '300ms' }}>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all active:scale-[0.98] shadow-md whitespace-nowrap"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  تواصل معنا
                </a>
                <a
                  href="https://www.facebook.com/hala.el.ghobary.2025/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all active:scale-[0.98] whitespace-nowrap animate-shake"
                >
                  لمعرفه الجلسات المتاحه
                </a>
                <a
                  href={`https://www.facebook.com/share/1AmnWEVTht/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all active:scale-[0.98] whitespace-nowrap"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  اشترك معنا ليصلك كل جديد
                </a>
              </div>

              <p className="scroll-reveal scroll-reveal-up text-[#D4AF37] text-base md:text-lg mt-5 text-center lg:text-right font-semibold tracking-wide" style={{ transitionDelay: '400ms' }}>
                <svg className="w-5 h-5 inline-block ml-1.5 -mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                متاح جلسات داخل و خارج مصر
              </p>
            </div>

            <div className="flex-1 flex justify-center lg:justify-start">
              <div className="scroll-reveal scroll-reveal-up relative" style={{ transitionDelay: '200ms' }}>
                <div className="absolute -inset-3 rounded-[40px] border border-sage/20 -rotate-2" />
                <div className="relative w-72 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[28rem] rounded-[32px] overflow-hidden shadow-2xl animate-float">
                  {about?.image_url ? (
                    <img src={about.image_url} alt="د. هالة" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-forest/10" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/20 to-transparent" />
                </div>
                <div className="absolute -bottom-5 -left-5 w-20 h-20 rounded-2xl bg-sage/10 border border-sage/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-sage/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {about?.stats?.length > 0 && (
        <section className="relative z-10 pb-10 -mt-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-3xl border-2 border-sage/20 shadow-md p-8">
              <div className="grid grid-cols-3 divide-x divide-sage/20">
                {about.stats.map((stat, idx) => (
                  <div key={idx} className="text-center scroll-reveal scroll-reveal-up" style={{ transitionDelay: `${idx * 100}ms` }}>
                    <div className="text-3xl md:text-4xl font-bold text-forest">{stat.value}</div>
                    <div className="text-sm text-coral font-bold mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section id="services" className="py-16 md:py-20 px-4 bg-warm">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14 scroll-reveal scroll-reveal-up">
            <span className="text-sage font-bold text-sm tracking-widest uppercase">الخدمات</span>
            <h2 className="text-3xl md:text-4xl font-heading font-black text-forest mt-2">
              <span className="text-coral">الجلسات</span> التي نقدمها
            </h2>
            <p className="text-forest/60 mt-3 max-w-xl mx-auto">نساعدك على تخطي التحديات النفسية خطوه بخطوه </p>
          </div>

          {[
            { icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'الاكتئاب وضغوطات الحياة', desc: 'مشاعر الحزن المستمر والضغط النفسي المستمر' },
            { icon: 'M9.5 14.5L16 8m0 0l-6-6m6 6H4', title: 'القلق والتوتر ونوبات الهلع', desc: 'الخوف الزايد والأفكار اللي بتجري في دماغك من غير سبب واضح' },
            { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', title: 'المشاكل الأسرية والعلاقات', desc: 'صعوبات التواصل مع شريك الحياة أو الأبناء أو أي علاقة مهمة بالنسبالك' },
            { icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z', title: 'اضطرابات النوم أو الأكل', desc: 'الأرق اللي مخليك تسهر أو تغيرات في الأكل بقى جزء من حياتك اليومية' },
          ].map((service, idx) => (
            <div key={idx} className="scroll-reveal scroll-reveal-up bg-white rounded-2xl p-5 md:p-6 shadow-sm card-hover flex items-start gap-4 mb-5 border border-sage/10" style={{ transitionDelay: `${idx * 100}ms` }}>
              <div className="w-12 h-12 rounded-xl bg-sage/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-coral" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-forest text-base">{service.title}</h3>
                <p className="text-forest/60 text-sm mt-1 leading-relaxed">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="library" className="py-16 md:py-20 px-4 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4 scroll-reveal scroll-reveal-up">
            <span className="text-sage font-bold text-sm tracking-widest uppercase">{t('landing.library_subtitle')}</span>
            <h2 className="text-3xl md:text-4xl font-heading font-black text-forest mt-2">
              {t('landing.library_title_before')} <span className="text-coral">{t('landing.library_title_highlight')}</span>
            </h2>
            <p className="text-forest/60 mt-3 max-w-xl mx-auto">{t('landing.library_desc')}</p>
          </div>

          <div className="relative scroll-reveal scroll-reveal-up overflow-visible py-0 spin-cylinder-container">

            <div className="relative flex items-center justify-center overflow-visible" style={{ height: isMobile ? `${380 + Math.max(0, displayVideos.length - 8) * 20}px` : `${520 + Math.max(0, displayVideos.length - 8) * 30}px` }}>
              <div className="spin-cylinder-track">
                {displayVideos.map((video, idx) => {
                  const N = displayVideos.length;
                  const angle = idx * (360 / N);
                  const baseRadius = isMobile ? 180 : 320;
                  const radius = N <= 8 ? baseRadius : baseRadius * Math.sin(Math.PI / 8) / Math.sin(Math.PI / N);

                  const videoUrl = video.file_url || video.url;
                  const youtubeId = getYoutubeId(videoUrl);
                  const thumb = youtubeId
                    ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
                    : video.cover_url || null;

                  const canPlay = !!videoUrl;

                  return (
                    <div
                      key={`${video.id}-${idx}`}
                      onClick={canPlay ? (e) => { e.stopPropagation(); setSelectedVideo(video); } : undefined}
                      className={`absolute left-1/2 top-1/2 flex-shrink-0 w-32 h-44 md:w-40 md:h-56 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${canPlay ? 'cursor-pointer group hover:shadow-coral/20 hover:border hover:border-coral/30' : ''}`}
                      style={{
                        transform: `translate3d(-50%, -50%, 0) rotateY(${angle}deg) translateZ(${radius}px) rotateY(180deg)`,
                        zIndex: 10,
                      }}
                    >
                      <div className="w-full h-full" style={{ transform: 'scaleX(-1)' }}>
                        {thumb ? (
                          <img src={thumb} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center" style={{ background: carouselColors[idx % carouselColors.length] }}>
                            <PlayIcon className="w-12 h-12 text-white/40" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <h3 className="text-white font-bold text-sm md:text-base leading-tight">{video.title}</h3>
                        </div>
                        {canPlay && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                              <PlayIcon className="text-forest w-5 h-5" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-16 mt-2.5 scroll-reveal scroll-reveal-up">
            {[
              { title: t('landing.feature_1_title'), desc: t('landing.feature_1_desc') },
              { title: t('landing.feature_2_title'), desc: t('landing.feature_2_desc') },
              { title: t('landing.feature_3_title'), desc: t('landing.feature_3_desc') },
            ].map((feat, idx) => (
              <div key={idx} className="text-center">
                <h3 className="font-bold text-coral text-base">{feat.title}</h3>
                <p className="text-black text-sm mt-4 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {certifications.length > 0 && (
        <section id="certifications" className="py-16 md:py-20 px-4 bg-cream">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14 scroll-reveal scroll-reveal-up">
              <span className="text-sage font-bold text-sm tracking-widest uppercase">{t('landing.certifications_subtitle')}</span>
              <h2 className="text-3xl md:text-4xl font-heading font-black text-forest mt-2">
                {t('landing.certifications_title_before')} <span className="text-coral">{t('landing.certifications_title_highlight')}</span> {t('landing.certifications_title_after')}
              </h2>
              <p className="text-forest/60 mt-3 max-w-xl mx-auto">{t('landing.certifications_desc')}</p>
            </div>

            <div className="space-y-6">
              {certifications.map((cert, idx) => (
                <CertificateCard key={cert.id || idx} cert={cert} idx={idx} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="testimonials" className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 scroll-reveal scroll-reveal-up">
            <span className="text-sage font-bold text-sm tracking-widest uppercase">{t('landing.testimonials_subtitle')}</span>
            <h2 className="text-3xl md:text-4xl font-heading font-black text-forest mt-2">
              {t('landing.testimonials_title_before')} <span className="text-coral">{t('landing.testimonials_title_highlight')}</span> {t('landing.testimonials_title_after')}
            </h2>
            <p className="text-forest/60 mt-3 max-w-xl mx-auto">{t('landing.testimonials_desc')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="scroll-reveal scroll-reveal-up bg-cream rounded-2xl shadow-sm card-hover pt-14 pb-8 px-6 text-center relative"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="absolute left-1/2 -translate-x-1/2 -top-10 w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden">
                  {item.avatar ? (
                    <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-sage to-forest flex items-center justify-center text-white font-heading text-xl font-bold">
                      {item.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-forest text-lg">{item.name}</h3>
                <p className="text-sage text-xs tracking-widest uppercase mt-1">{item.role}</p>
                <p className="text-forest/70 text-sm mt-4 leading-relaxed italic">"{item.review}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 md:py-20 px-4 bg-cream">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14 scroll-reveal scroll-reveal-up">
            <span className="text-sage font-bold text-sm tracking-widest uppercase">الأسئلة</span>
            <h2 className="text-3xl md:text-4xl font-heading font-black text-forest mt-2">
              أسئلة <span className="text-coral">شائعة</span>
            </h2>
            <p className="text-forest/60 mt-3 max-w-xl mx-auto">إجابات لأكثر الأسئلة التي تهمك</p>
          </div>

          <div className="space-y-4">
            {[
              { q: 'الجلسات بتكون أونلاين ولا حضوري؟', a: 'الجلسات متاحة أونلاين فيديو كول وفي نفس الوقت متاحة حضوري، حسب اللي يناسبك' },
              { q: 'كم مدة الجلسة؟', a: 'مدة الجلسة حوالي ساعة كاملة، وفيه جلسات مكثفة حسب الحالة' },
              { q: 'هل الجلسة مرة واحدة ولا محتاج أكتر من مرة؟', a: 'العدد بيختلف حسب الحاجة، بعض الحالات بتكتفي بجلسات قليلة والتانية محتاجة متابعة أطول. بنحدد ده مع بعض' },
              { q: 'كيف أحجز جلسة؟', a: 'تقدر تتواصل معانا عبر واتساب من رابط تواصل معنا الموجود في الصفحة، وهنرد عليك فوراً' },
              { q: 'هل فيه خصوصية للجلسات؟', a: 'طبعاً، كل الجلسات سرية تامة وملتزمون بأعلى معايير الخصوصية المهنية' },
            ].map((item, idx) => (
              <details key={idx} className="scroll-reveal scroll-reveal-up group bg-white rounded-2xl shadow-sm border border-sage/10 overflow-hidden" style={{ transitionDelay: `${idx * 80}ms` }}>
                <summary className="cursor-pointer list-none flex items-center justify-between p-5 md:p-6 font-bold text-forest transition-colors">
                  {item.q}
                  <svg className="w-5 h-5 text-sage flex-shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 md:px-6 pb-5 md:pb-6">
                  <p className="text-forest/60 text-sm leading-relaxed">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {selectedVideo && (
        <VideoPlayerModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}

      <footer className="bg-forest text-white/70 border-t border-white/10 py-14">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white font-heading text-lg">{t('landing.footer_brand')}</p>
          <p className="text-white/50">{t('landing.footer_copyright')}</p>
          <p className="text-white/40 text-sm mt-4">
            صنع بواسطة{' '}
            <a
              href="https://www.facebook.com/teck.makers.2025/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sage hover:text-sage-light transition-colors underline underline-offset-2"
            >
              TechMakers
            </a>
            {' '}لبناء الويبسايت الخاص بك
          </p>
        </div>
      </footer>
    </div>
  );
}
