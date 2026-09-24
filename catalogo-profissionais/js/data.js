window.NICHE_ORDER = ['dentista', 'psicologo', 'advogado', 'contador'];

window.NICHES = {
  dentista: {
    label: 'Dentista',
    area: 'Odontologia',
    icon: 'tooth',
    font: '600 48px "Bricolage Grotesque"',
    theme: { color: '#177E9E', beam: '#1FB3DA', bg: '#F5F9FA' },
    brand: { name: 'Dr. Lucas Ferraz', role: 'Odontologia estética', mono: 'LF' },
    registro: 'CRO-SP 12.345',
    img: {
      hero: '1677026010083-78ec7f1b84ed', heroAlt: 'Sorriso com dentes claros e naturais',
      about: '1606811841689-23dfddce3e95', aboutAlt: 'Dentista mostrando o planejamento do tratamento em uma tela para a paciente',
      space: '1629909613654-28e377c37b09', spaceAlt: 'Consultório odontológico claro e organizado'
    },
    hero: {
      eyebrow: 'Odontologia estética · Moema, São Paulo',
      title: 'Um sorriso que parece seu, só que no melhor dia.',
      text: 'Tratamentos planejados com calma e explicados em detalhe, do check-up às lentes de contato dental. Você vê o resultado no planejamento digital antes de começar.',
      cta: 'Agendar avaliação',
      ctaShort: 'Agendar',
      cta2: 'Ver tratamentos',
      chip1: { icon: 'calendar', label: 'Próximo horário', value: 'Terça, 14h30' }
    },
    trust: [
      ['Registro', 'CRO-SP 12.345'],
      ['Experiência', '14 anos de clínica'],
      ['Tecnologia', 'Escaneamento 3D'],
      ['Convênios', 'Principais planos aceitos']
    ],
    about: {
      title: 'Prazer, sou o Lucas.',
      text: [
        'Me formei em Odontologia pela USP e me especializei em dentística e prótese. Há 14 anos atendo com a mesma regra: ninguém começa um tratamento sem entender cada etapa.',
        'No consultório você vê o seu sorriso no planejamento digital antes de qualquer procedimento e sai com um plano claro de prazos e investimento.'
      ],
      creds: ['Especialista em Dentística', 'Pós-graduação em Prótese e Implantes', 'Certificação em fluxo digital e escaneamento 3D']
    },
    map: {
      nav: 'Tratamentos',
      eyebrow: 'Tratamentos',
      title: 'Tudo o que o seu sorriso precisa, em um só lugar',
      hint: 'Toque em um ramo do mapa para ver os detalhes de cada tratamento.',
      center: 'Seu sorriso',
      items: [
        { t: 'Clareamento', d: 'Clareamento em consultório e caseiro supervisionado, com controle de sensibilidade em cada sessão.', tags: ['Consultório', 'Caseiro', 'Moldeira'] },
        { t: 'Lentes de contato', d: 'Lâminas finas de porcelana que corrigem cor, forma e pequenos desalinhamentos, testadas antes em um ensaio na sua boca.', tags: ['Porcelana', 'Resina', 'Mock-up'] },
        { t: 'Implantes', d: 'Reposição de dentes com planejamento por tomografia e cirurgia guiada, mais previsível e confortável.', tags: ['Unitário', 'Protocolo', 'Cirurgia guiada'] },
        { t: 'Ortodontia', d: 'Alinhadores transparentes e aparelhos autoligados para adultos e adolescentes.', tags: ['Alinhadores', 'Autoligado', 'Contenção'] },
        { t: 'Prevenção', d: 'Limpeza, check-up e acompanhamento periódico para toda a família.', tags: ['Limpeza', 'Flúor', 'Check-up'] },
        { t: 'Urgências', d: 'Dor, fratura ou restauração solta: horários reservados para encaixe no mesmo dia.', tags: ['Dor', 'Fratura', 'Mesmo dia'] }
      ]
    },
    steps: {
      title: 'Do primeiro contato ao sorriso novo',
      items: [
        { t: 'Primeiro contato', d: 'Você chama no WhatsApp e escolhe o melhor horário.' },
        { t: 'Avaliação completa', d: 'Exame clínico, fotos e escaneamento 3D do sorriso.' },
        { t: 'Plano claro', d: 'Etapas, prazos e valores definidos antes de começar.' },
        { t: 'Acompanhamento', d: 'Retornos agendados e manutenção preventiva.' }
      ]
    },
    proof: {
      type: 'testimonials',
      eyebrow: 'Depoimentos',
      title: 'Quem já passou pela cadeira',
      items: [
        { k: 'Lentes de contato', q: 'Eu tinha vergonha de sorrir em foto. O Lucas me mostrou o resultado antes de começar e ficou natural, do jeito que eu queria.', n: 'Mariana S.', m: 'Paciente desde 2022' },
        { k: 'Implante', q: 'Tinha pavor de dentista. A consulta foi tranquila, tudo explicado, e a cirurgia foi bem mais rápida do que eu imaginava.', n: 'Roberto A.', m: 'Paciente desde 2020' },
        { k: 'Prevenção', q: 'Atendimento pontual e sem pressa. Hoje levo a família toda para as revisões.', n: 'Juliana P.', m: 'Paciente desde 2019' }
      ]
    },
    faq: [
      ['Vocês atendem convênio?', 'Atendemos os principais planos odontológicos para prevenção e tratamentos básicos. Tratamentos estéticos são particulares, com opções de parcelamento.'],
      ['A avaliação tem custo?', 'A primeira avaliação inclui exame clínico, fotos e escaneamento 3D. O valor é abatido se você fechar o tratamento.'],
      ['Clareamento deixa os dentes sensíveis?', 'Pode haver sensibilidade leve e passageira. Usamos géis dessensibilizantes e ajustamos a concentração ao seu caso.'],
      ['Quanto tempo duram as lentes de contato?', 'Com bons hábitos e revisões periódicas, lentes de porcelana duram em média de 10 a 15 anos.'],
      ['Vocês atendem urgência?', 'Sim. Reservamos horários todos os dias para encaixe de casos de dor e fratura.']
    ],
    contact: {
      title: 'Agende sua avaliação',
      text: 'Chame no WhatsApp, conte o que está incomodando e a gente encontra o melhor horário.',
      address: 'Av. Ibirapuera, 2120, conj. 84 · Moema, São Paulo',
      hours: 'Seg a sex, 8h às 19h · Sáb, 8h às 12h',
      phone: '(11) 3000-0000',
      email: 'contato@lucasferraz.odo.br',
      spaceLabel: 'Consultório',
      district: 'Moema, São Paulo'
    }
  },

  psicologo: {
    label: 'Psicólogo',
    area: 'Psicologia',
    icon: 'psi',
    font: '450 48px "Fraunces"',
    theme: { color: '#5E7351', beam: '#D9825F', bg: '#F7F2EA' },
    brand: { name: 'Ana Ribeiro', role: 'Psicóloga clínica', mono: 'AR' },
    registro: 'CRP 06/123456',
    img: {
      hero: '1637245048732-adf1a547835e', heroAlt: 'Sala de atendimento clara com duas poltronas e uma planta',
      about: '1714976694810-85add1a29c96', aboutAlt: 'Psicóloga conversando durante uma sessão',
      space: '1714976694525-71eb29a7c500', spaceAlt: 'Paciente sentada em um sofá durante a sessão'
    },
    hero: {
      eyebrow: 'Psicoterapia para adultos · presencial e online',
      title: 'Um lugar seguro para falar sobre o que pesa.',
      text: 'Terapia cognitivo-comportamental para ansiedade, luto, relacionamentos e momentos de mudança. No seu ritmo e sem julgamentos.',
      cta: 'Agendar primeira conversa',
      ctaShort: 'Agendar',
      cta2: 'Como posso ajudar',
      chip1: { icon: 'video', label: 'Atendimento', value: 'Presencial e online' }
    },
    trust: [
      ['Registro', 'CRP 06/123456'],
      ['Abordagem', 'Terapia cognitivo-comportamental'],
      ['Sessões', '50 minutos, semanais'],
      ['Formato', 'Presencial e online']
    ],
    about: {
      title: 'Prazer, sou a Ana.',
      text: [
        'Sou psicóloga clínica há 11 anos e acompanho adultos em processos de ansiedade, luto e mudanças de vida. Trabalho com terapia cognitivo-comportamental, uma abordagem baseada em evidências.',
        'Para mim, terapia é parceria: a gente define os objetivos juntos e revisa o caminho sempre que for preciso.'
      ],
      creds: ['Mestre em Psicologia Clínica', 'Formação em Terapia Cognitivo-Comportamental', 'Especialização em Luto']
    },
    map: {
      nav: 'Áreas',
      eyebrow: 'Áreas de atuação',
      title: 'Como a terapia pode te ajudar',
      hint: 'Toque em um ramo do mapa para ver cada tema com mais calma.',
      center: 'Você',
      items: [
        { t: 'Ansiedade', d: 'Entender os gatilhos, reduzir a preocupação constante e recuperar o sono e a concentração.', tags: ['Crises', 'Insônia', 'Preocupação'] },
        { t: 'Luto', d: 'Acolhimento para atravessar perdas, no tempo de cada pessoa.', tags: ['Perdas', 'Saudade', 'Recomeço'] },
        { t: 'Relacionamentos', d: 'Padrões que se repetem, limites, comunicação e dependência emocional.', tags: ['Limites', 'Comunicação', 'Vínculos'] },
        { t: 'Autoestima', d: 'Autocrítica, insegurança e a relação com o próprio corpo e com as conquistas.', tags: ['Autocrítica', 'Confiança', 'Imagem'] },
        { t: 'Trabalho', d: 'Esgotamento, pressão por desempenho e decisões de carreira.', tags: ['Burnout', 'Carreira', 'Pressão'] },
        { t: 'Transições', d: 'Mudança de cidade, fim de ciclo, chegada de filhos, aposentadoria.', tags: ['Mudanças', 'Parentalidade', 'Novos ciclos'] }
      ]
    },
    steps: {
      title: 'Um processo no seu ritmo',
      items: [
        { t: 'Primeiro contato', d: 'Você me chama e combinamos um horário, sem compromisso.' },
        { t: 'Primeira sessão', d: 'Conversamos sobre o que te trouxe e como a terapia funciona.' },
        { t: 'Objetivos juntos', d: 'Definimos focos e a frequência ideal para você.' },
        { t: 'Acompanhamento', d: 'Sessões semanais com revisões periódicas do processo.' }
      ]
    },
    proof: {
      type: 'articles',
      eyebrow: 'Conteúdos',
      title: 'Leituras para entre as sessões',
      items: [
        { k: 'Ansiedade · 5 min', q: 'Por que a ansiedade piora à noite, e o que fazer quando o pensamento não para' },
        { k: 'Relacionamentos · 7 min', q: 'Como colocar limites sem culpa em relações próximas' },
        { k: 'Terapia · 4 min', q: 'Primeira sessão de terapia: o que esperar e como se preparar' }
      ]
    },
    faq: [
      ['Como funciona a terapia online?', 'As sessões acontecem por videochamada em uma plataforma segura, com a mesma duração e o mesmo sigilo do atendimento presencial.'],
      ['Quanto tempo dura o processo?', 'Depende dos seus objetivos. Revisamos juntos o andamento a cada poucos meses.'],
      ['Você atende por convênio?', 'O atendimento é particular, com emissão de recibo para pedir reembolso ao seu plano de saúde.'],
      ['O que eu falo fica em sigilo?', 'Sim. O sigilo é garantido pelo Código de Ética Profissional do Psicólogo.'],
      ['Preciso estar em crise para começar?', 'Não. A terapia também serve para se conhecer melhor e prevenir sofrimento.']
    ],
    contact: {
      title: 'Vamos marcar uma primeira conversa?',
      text: 'Me chame no WhatsApp e combinamos um horário, presencial ou online.',
      address: 'Rua Harmonia, 350, sala 3 · Vila Madalena, São Paulo',
      hours: 'Seg a sex, 9h às 20h',
      phone: '(11) 3000-0001',
      email: 'contato@anaribeiro.psi.br',
      spaceLabel: 'Consultório',
      district: 'Vila Madalena, São Paulo'
    }
  },

  advogado: {
    label: 'Advogado',
    area: 'Advocacia',
    icon: 'scale',
    font: '600 48px "Cormorant Garamond"',
    theme: { color: '#1F3A2A', beam: '#C9A227', bg: '#F7F5EF' },
    brand: { name: 'André Nogueira', role: 'Advocacia', mono: 'AN' },
    registro: 'OAB/SP 123.456',
    img: {
      hero: '1605602517387-ec78b947335e', heroAlt: 'Retrato do advogado com as mãos entrelaçadas',
      about: '1605602517229-cdbfc3dfb70c', aboutAlt: 'Advogado sentado em retrato profissional',
      space: '1755551636128-2385f552d7ec', spaceAlt: 'Sala de reuniões do escritório'
    },
    hero: {
      eyebrow: 'Família, trabalhista e empresarial',
      title: 'Orientação jurídica clara para decisões importantes.',
      text: 'Atuação consultiva e contenciosa com atendimento próximo, linguagem direta e acompanhamento de cada etapa do seu caso.',
      cta: 'Agendar consulta',
      ctaShort: 'Consulta',
      cta2: 'Áreas de atuação',
      chip1: { icon: 'clock', label: 'Retorno', value: 'Em até 24h úteis' }
    },
    trust: [
      ['Inscrição', 'OAB/SP 123.456'],
      ['Experiência', '16 anos de advocacia'],
      ['Atendimento', 'Presencial e por vídeo'],
      ['Atuação', 'Consultiva e contenciosa']
    ],
    about: {
      title: 'Prazer, sou o André.',
      text: [
        'Advogo há 16 anos em direito de família, trabalhista e empresarial. Antes de qualquer medida, explico riscos, caminhos possíveis e custos com clareza.',
        'Acredito que um bom advogado evita o problema tanto quanto resolve. Por isso a consultoria preventiva é parte central do meu trabalho.'
      ],
      creds: ['Mestre em Direito Civil', 'Especialista em Direito do Trabalho', 'Mediador judicial certificado']
    },
    map: {
      nav: 'Áreas',
      eyebrow: 'Áreas de atuação',
      title: 'Onde posso te orientar',
      hint: 'Toque em um ramo do mapa para ver os detalhes de cada área.',
      center: 'Seu caso',
      items: [
        { t: 'Família', d: 'Divórcio, guarda, pensão alimentícia e inventário, com prioridade para acordos.', tags: ['Divórcio', 'Guarda', 'Pensão'] },
        { t: 'Trabalhista', d: 'Assessoria a empregados e empresas em rescisões, acordos e reclamações.', tags: ['Rescisão', 'Acordos', 'Defesa'] },
        { t: 'Empresarial', d: 'Contratos, sociedade, registro de marca e prevenção de litígios.', tags: ['Contratos', 'Sociedade', 'Marcas'] },
        { t: 'Consumidor', d: 'Cobranças indevidas, problemas com produtos e serviços, negativação.', tags: ['Cobranças', 'Bancos', 'Serviços'] },
        { t: 'Imobiliário', d: 'Compra e venda, locação, usucapião e regularização de imóveis.', tags: ['Compra e venda', 'Locação', 'Usucapião'] },
        { t: 'Sucessões', d: 'Testamento, planejamento sucessório e holding familiar.', tags: ['Testamento', 'Planejamento', 'Holding'] }
      ]
    },
    steps: {
      title: 'Etapas claras, sem surpresas',
      items: [
        { t: 'Primeiro contato', d: 'Você descreve a situação e agendamos a consulta.' },
        { t: 'Análise do caso', d: 'Estudo dos documentos e dos caminhos possíveis.' },
        { t: 'Estratégia', d: 'Proposta de atuação com prazos e honorários definidos.' },
        { t: 'Acompanhamento', d: 'Atualizações a cada movimentação do processo.' }
      ]
    },
    proof: {
      type: 'articles',
      eyebrow: 'Conteúdos',
      title: 'Informação jurídica sem juridiquês',
      items: [
        { k: 'Família · 6 min', q: 'Guarda compartilhada: o que muda na rotina dos filhos e dos pais' },
        { k: 'Trabalhista · 5 min', q: 'Rescisão de contrato: quais verbas conferir antes de assinar' },
        { k: 'Empresarial · 7 min', q: 'Contrato social: cláusulas que evitam conflitos entre sócios' }
      ]
    },
    faq: [
      ['A primeira consulta é paga?', 'Sim. A consulta inicial tem valor fixo, informado no agendamento, e inclui a análise preliminar dos documentos.'],
      ['Como são cobrados os honorários?', 'Os valores seguem a tabela da OAB e são definidos em contrato antes de qualquer medida.'],
      ['Atende clientes de outras cidades?', 'Sim. Os processos são eletrônicos e o atendimento pode ser feito por videochamada.'],
      ['Quanto tempo demora um processo?', 'Depende do tipo de ação e da vara. Sempre que possível, buscamos acordos, que são mais rápidos.'],
      ['Quais documentos devo levar?', 'Documento de identidade e tudo o que tiver relação com o caso: contratos, mensagens e comprovantes.']
    ],
    contact: {
      title: 'Agende uma consulta',
      text: 'Conte brevemente a sua situação pelo WhatsApp e retornamos com os horários disponíveis.',
      address: 'Rua Joaquim Floriano, 900, 12º andar · Itaim Bibi, São Paulo',
      hours: 'Seg a sex, 9h às 18h',
      phone: '(11) 3000-0002',
      email: 'contato@andrenogueira.adv.br',
      spaceLabel: 'Escritório',
      district: 'Itaim Bibi, São Paulo'
    }
  },

  contador: {
    label: 'Contador',
    area: 'Contabilidade',
    icon: 'chart',
    font: '600 48px "IBM Plex Sans"',
    theme: { color: '#1D3A5C', beam: '#3A86C8', bg: '#F4F7FA' },
    brand: { name: 'Carla Mendes', role: 'Contabilidade consultiva', mono: 'CM' },
    registro: 'CRC-SP 1SP123456',
    img: {
      hero: '1713947503588-8ff8196dc4a3', heroAlt: 'Contadora trabalhando no notebook em um escritório claro',
      about: '1664382951020-41874ae61a44', aboutAlt: 'Contadora de óculos analisando documentos na mesa',
      space: '1713461983836-de0a45009424', spaceAlt: 'Relatórios financeiros e calculadora sobre a mesa'
    },
    hero: {
      eyebrow: 'Para MEI, autônomos e pequenas empresas',
      title: 'Impostos em dia e você com tempo para o seu negócio.',
      text: 'Abertura de empresa, rotina fiscal e planejamento tributário com atendimento humano e relatórios mensais fáceis de entender.',
      cta: 'Falar com a contadora',
      ctaShort: 'Falar agora',
      cta2: 'Ver serviços',
      chip1: { icon: 'report', label: 'Relatório mensal', value: 'Enviado até o dia 5' }
    },
    trust: [
      ['Registro', 'CRC-SP 1SP123456'],
      ['Experiência', '12 anos de mercado'],
      ['Atendimento', '100% digital ou presencial'],
      ['Regimes', 'MEI, Simples e Presumido']
    ],
    about: {
      title: 'Prazer, sou a Carla.',
      text: [
        'Sou contadora há 12 anos e atendo profissionais liberais e pequenas empresas que querem pagar o imposto certo, nem mais nem menos.',
        'Traduzo números em decisões: todo mês você recebe um resumo simples do que entrou, do que saiu e do que vem pela frente.'
      ],
      creds: ['Especialista em Planejamento Tributário', 'MBA em Gestão Financeira', 'Atualização contínua na Reforma Tributária']
    },
    map: {
      nav: 'Serviços',
      eyebrow: 'Serviços',
      title: 'Tudo que a sua empresa precisa, em um só lugar',
      hint: 'Toque em um ramo do mapa para ver o que está incluído em cada serviço.',
      center: 'Sua empresa',
      items: [
        { t: 'Abertura de empresa', d: 'Escolha do tipo de empresa, CNPJ, alvarás e inscrições, do zero ao primeiro faturamento.', tags: ['CNPJ', 'Alvarás', 'MEI para ME'] },
        { t: 'Rotina fiscal', d: 'Apuração de impostos, emissão de guias e entrega das obrigações sempre no prazo.', tags: ['Guias', 'Obrigações', 'Notas fiscais'] },
        { t: 'Folha de pagamento', d: 'Admissões, férias, rescisões e eSocial sem dor de cabeça.', tags: ['eSocial', 'Pró-labore', 'Férias'] },
        { t: 'Planejamento tributário', d: 'Análise do regime ideal para pagar menos imposto dentro da lei.', tags: ['Simples', 'Presumido', 'Reforma'] },
        { t: 'Imposto de Renda', d: 'Declaração de pessoa física com revisão das deduções e acompanhamento da malha fina.', tags: ['IRPF', 'Deduções', 'Malha fina'] },
        { t: 'Relatórios', d: 'Resumo mensal de faturamento, despesas e impostos em linguagem simples.', tags: ['DRE', 'Fluxo de caixa', 'Indicadores'] }
      ]
    },
    steps: {
      title: 'Trocar de contador é mais simples do que parece',
      items: [
        { t: 'Diagnóstico', d: 'Entendemos a sua atividade, o faturamento e o regime atual.' },
        { t: 'Proposta', d: 'Plano de serviços com valor mensal fixo.' },
        { t: 'Migração', d: 'Cuidamos da troca de contador e dos documentos.' },
        { t: 'Rotina mensal', d: 'Guias, relatórios e suporte pelo WhatsApp.' }
      ]
    },
    proof: {
      type: 'testimonials',
      eyebrow: 'Depoimentos',
      title: 'Quem já confia na Carla',
      items: [
        { k: 'Clínica de estética', q: 'Descobrimos que estávamos no regime errado. A economia no primeiro ano pagou a contabilidade inteira.', n: 'Patrícia L.', m: 'Cliente desde 2021' },
        { k: 'Desenvolvedor PJ', q: 'Saí do MEI para ME sem susto. Tudo explicado pelo WhatsApp, sem complicação.', n: 'Felipe R.', m: 'Cliente desde 2023' },
        { k: 'Restaurante', q: 'Relatório todo mês, guias no prazo e resposta rápida. Nunca mais paguei multa.', n: 'Marcos T.', m: 'Cliente desde 2020' }
      ]
    },
    faq: [
      ['Como funciona a troca de contador?', 'Nós cuidamos de tudo: pedimos os documentos ao contador atual e fazemos a transição sem interromper a sua rotina.'],
      ['Atendem empresas de outras cidades?', 'Sim. O atendimento é 100% digital, com reuniões por videochamada quando necessário.'],
      ['Qual é o valor da mensalidade?', 'Depende do regime tributário, do faturamento e do número de funcionários. A proposta é fixa e sem surpresas.'],
      ['Vocês fazem declaração de Imposto de Renda?', 'Sim, para clientes da contabilidade e também para pessoas físicas avulsas.'],
      ['Como envio notas e documentos?', 'Por um portal online ou pelo WhatsApp, como for mais prático para você.']
    ],
    contact: {
      title: 'Vamos organizar suas contas?',
      text: 'Chame no WhatsApp para um diagnóstico gratuito do seu regime tributário.',
      address: 'Rua Funchal, 411, 5º andar · Vila Olímpia, São Paulo',
      hours: 'Seg a sex, 8h30 às 18h',
      phone: '(11) 3000-0003',
      email: 'contato@carlamendes.cnt.br',
      spaceLabel: 'Escritório',
      district: 'Vila Olímpia, São Paulo'
    }
  }
};
