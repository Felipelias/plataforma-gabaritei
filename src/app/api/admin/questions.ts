import { supabase } from '@/lib/supabase';

export default async function handler(req, res) {
  const { method, body } = req;

  // Aqui você deve validar role == admin

  switch (method) {
    case 'GET':
      const { simulado_type, subject_id } = req.query;
      let query = supabase.from('questions').select('id, text, simulado_type, subject_id');
      if (simulado_type) query = query.eq('simulado_type', simulado_type);
      if (subject_id) query = query.eq('subject_id', subject_id);
      const { data } = await query;
      return res.status(200).json(data);
    case 'POST':
      const { text, simulado_type: st, subject_id: sid, options, explanation, video_url } = body;
      const { data: question } = await supabase
        .from('questions')
        .insert({ text, simulado_type: st, subject_id: sid, explanation, video_url })
        .select()
        .single();
      for (const o of options) {
        await supabase.from('options').insert({ question_id: question.id, text: o.text, is_correct: o.is_correct });
      }
      return res.status(200).json(question);
    case 'PUT':
      const { id, ...updateData } = body;
      await supabase.from('questions').update(updateData).eq('id', id);
      return res.status(200).json({ success: true });
    case 'DELETE':
      const { delete_id } = body;
      await supabase.from('questions').delete().eq('id', delete_id);
      return res.status(200).json({ success: true });
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
