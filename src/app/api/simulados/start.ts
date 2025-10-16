import { supabase } from '@/lib/supabase';

export default async function handler(req, res) {
  const { simulado_type } = req.body;
  if (!simulado_type) return res.status(400).json({ error: "Simulado type required" });

  const { data: questions } = await supabase
    .from('questions')
    .select('id, text, options(id, text)')
    .eq('simulado_type', simulado_type);

  // Embaralhar alternativas
  const shuffledQuestions = questions.map(q => ({
    ...q,
    options: q.options.sort(() => Math.random() - 0.5)
  })).sort(() => Math.random() - 0.5);

  res.status(200).json(shuffledQuestions);
}

