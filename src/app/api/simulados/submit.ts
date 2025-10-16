import { supabase } from '@/lib/supabase';

export default async function handler(req, res) {
  const { user_id, simulado_type, answers, time_seconds } = req.body;

  if (!user_id || !answers) return res.status(400).json({ error: "Dados incompletos" });

  let correct = 0, wrong = 0, blank = 0;

  for (const a of answers) {
    if (!a.selected_option_id) {
      blank++;
    } else {
      const { data: option } = await supabase
        .from('options')
        .select('is_correct')
        .eq('id', a.selected_option_id)
        .single();
      if (option?.is_correct) correct++;
      else wrong++;
    }
  }

  const { data: attempt } = await supabase
    .from('simulado_attempts')
    .insert({
      user_id,
      simulado_type,
      total_questions: answers.length,
      correct,
      wrong,
      blank,
      time_seconds
    })
    .select()
    .single();

  // salvar respostas individuais
  for (const a of answers) {
    await supabase.from('simulado_attempt_answers').insert({
      attempt_id: attempt.id,
      question_id: a.question_id,
      selected_option_id: a.selected_option_id || null,
      is_correct: a.selected_option_id ? (a.is_correct ?? false) : null
    });
  }

  res.status(200).json({ attempt_id: attempt.id, correct, wrong, blank });
}
