-- Gerado por scripts/gerar-seed.mjs. Não edite à mão.
begin;
insert into public.fontes (id, titulo, veiculo, url) values ('costa-espada', 'Snake Plant Care: The Complete Growing Guide', 'Costa Farms', 'https://costafarms.com/blogs/get-growing/complete-snake-plant-growing-guide') on conflict (id) do update set titulo = excluded.titulo, veiculo = excluded.veiculo, url = excluded.url;
insert into public.fontes (id, titulo, veiculo, url) values ('gkh-espada', 'Snake Plant Care Guide', 'Gardening Know How', 'https://www.gardeningknowhow.com/houseplantssnake-plant/snake-plant-care.htm') on conflict (id) do update set titulo = excluded.titulo, veiculo = excluded.veiculo, url = excluded.url;
insert into public.fontes (id, titulo, veiculo, url) values ('aspca', 'Toxic and Non-Toxic Plants List', 'ASPCA — Animal Poison Control', 'https://www.aspca.org/pet-care/animal-poison-control/toxic-and-non-toxic-plants') on conflict (id) do update set titulo = excluded.titulo, veiculo = excluded.veiculo, url = excluded.url;
insert into public.fontes (id, titulo, veiculo, url) values ('nasa89', 'NASA Clean Air Study (relatório de 1989, Wolverton et al.)', 'Wikipédia — verbete com a referência do relatório', 'https://en.wikipedia.org/wiki/NASA_Clean_Air_Study') on conflict (id) do update set titulo = excluded.titulo, veiculo = excluded.veiculo, url = excluded.url;
insert into public.fontes (id, titulo, veiculo, url) values ('drexel20', 'Revisão de 196 experimentos (Cummings & Waring, Drexel, 2020): plantas em vaso não melhoram o ar de um ambiente real', 'The Philadelphia Inquirer', 'https://www.inquirer.com/health/drexel-study-houseplants-indoor-air-purifying-nasa-20191108.html') on conflict (id) do update set titulo = excluded.titulo, veiculo = excluded.veiculo, url = excluded.url;
insert into public.fontes (id, titulo, veiculo, url) values ('rhs-jiboia-ficha', 'Epipremnum aureum — ficha da planta (tamanho da folha, poda, pragas)', 'Royal Horticultural Society', 'https://www.rhs.org.uk/plants/91403/epipremnum-aureum/details') on conflict (id) do update set titulo = excluded.titulo, veiculo = excluded.veiculo, url = excluded.url;
insert into public.fontes (id, titulo, veiculo, url) values ('rhs-jiboia-guia', 'How to grow epipremnum — guia de cultivo', 'Royal Horticultural Society', 'https://www.rhs.org.uk/plants/epipremnum/growing-guide') on conflict (id) do update set titulo = excluded.titulo, veiculo = excluded.veiculo, url = excluded.url;
insert into public.fontes (id, titulo, veiculo, url) values ('gw-zamio', 'How to grow ZZ plant (Zamioculcas zamiifolia)', 'BBC Gardeners'' World Magazine', 'https://gardenersworld.com/house-plants/how-to-grow-zz-plant-zamioculcas-zamiifolia') on conflict (id) do update set titulo = excluded.titulo, veiculo = excluded.veiculo, url = excluded.url;
insert into public.fontes (id, titulo, veiculo, url) values ('ill-zamio', 'Houseplant spotlight: ZZ plant', 'University of Illinois Extension — Good Growing', 'https://extension.illinois.edu/blogs/good-growing/2026-01-09-houseplant-spotlight-zz-plant') on conflict (id) do update set titulo = excluded.titulo, veiculo = excluded.veiculo, url = excluded.url;
insert into public.fontes (id, titulo, veiculo, url) values ('epic-lirio', 'How Much and How Often Should You Water Peace Lilies?', 'Epic Gardening', 'https://www.epicgardening.com/peace-lily-watering/') on conflict (id) do update set titulo = excluded.titulo, veiculo = excluded.veiculo, url = excluded.url;
insert into public.fontes (id, titulo, veiculo, url) values ('hg-lirio', 'How do peace lilies purify the air?', 'Homes & Gardens', 'https://www.homesandgardens.com/gardens/how-do-peace-lilies-purify-the-air') on conflict (id) do update set titulo = excluded.titulo, veiculo = excluded.veiculo, url = excluded.url;
insert into public.fontes (id, titulo, veiculo, url) values ('gkh-monstera', 'How to Grow a Monstera Houseplant', 'Gardening Know How', 'https://www.gardeningknowhow.com/houseplants/swiss-cheese-plant/monstera-plant-care.htm') on conflict (id) do update set titulo = excluded.titulo, veiculo = excluded.veiculo, url = excluded.url;
insert into public.fontes (id, titulo, veiculo, url) values ('epic-monstera', 'How to Plant, Grow, and Care for Monstera Deliciosa', 'Epic Gardening', 'https://www.epicgardening.com/monstera-deliciosa/') on conflict (id) do update set titulo = excluded.titulo, veiculo = excluded.veiculo, url = excluded.url;
insert into public.fontes (id, titulo, veiculo, url) values ('bv-lavanda', 'How to Grow Lavender Indoors', 'Bob Vila', 'https://www.bobvila.com/articles/how-to-grow-lavender-indoors/') on conflict (id) do update set titulo = excluded.titulo, veiculo = excluded.veiculo, url = excluded.url;
insert into public.fontes (id, titulo, veiculo, url) values ('gardenia-lavanda', 'How to Successfully Grow and Care for a Lavender Plant Indoors', 'Gardenia.net', 'https://www.gardenia.net/guide/how-to-successfully-grow-care-for-a-lavender-plant-indoors') on conflict (id) do update set titulo = excluded.titulo, veiculo = excluded.veiculo, url = excluded.url;
insert into public.fontes (id, titulo, veiculo, url) values ('wff-jasmim', 'Jasmine: Fragrance Beyond Description in the Dead of Winter (cultivo e frio para florir)', 'White Flower Farm', 'https://www.whiteflowerfarm.com/indoor-flowering-jasmine-flowers-plants-vines.shtml') on conflict (id) do update set titulo = excluded.titulo, veiculo = excluded.veiculo, url = excluded.url;
insert into public.fontes (id, titulo, veiculo, url) values ('nybg-jasmim', 'How can I care for my jasmine houseplant?', 'New York Botanical Garden — LibAnswers', 'https://libanswers.nybg.org/faq/223270') on conflict (id) do update set titulo = excluded.titulo, veiculo = excluded.veiculo, url = excluded.url;
insert into public.fontes (id, titulo, veiculo, url) values ('logees-jasmim', 'Jasminum polyanthum — ficha de produto com altura', 'Logee’s', 'https://www.logees.com/winterjasmine') on conflict (id) do update set titulo = excluded.titulo, veiculo = excluded.veiculo, url = excluded.url;
insert into public.fontes (id, titulo, veiculo, url) values ('purdue-samambaia', 'Indoor Ferns (HO-141-W): umidade mínima, faixa desejável e adubação', 'Purdue University Extension', 'https://ag.purdue.edu/department/hla/extension/extension-publications-library/ext-pubs/ho-141-w.html') on conflict (id) do update set titulo = excluded.titulo, veiculo = excluded.veiculo, url = excluded.url;
insert into public.fontes (id, titulo, veiculo, url) values ('bv-samambaia', 'Boston Fern Care', 'Bob Vila', 'https://www.bobvila.com/articles/boston-fern-care') on conflict (id) do update set titulo = excluded.titulo, veiculo = excluded.veiculo, url = excluded.url;
insert into public.fontes (id, titulo, veiculo, url) values ('clemson-aglaonema', 'Chinese Evergreen (Aglaonema) Care, Cultivation & Growing Guide', 'Clemson Cooperative Extension — HGIC', 'https://hgic.clemson.edu/factsheet/chinese-evergreen-aglaonema-care-cultivation-growing-guide/') on conflict (id) do update set titulo = excluded.titulo, veiculo = excluded.veiculo, url = excluded.url;
insert into public.fontes (id, titulo, veiculo, url) values ('almanac-aglaonema', 'Chinese Evergreen — temperatura, umidade e toxicidade', 'The Old Farmer’s Almanac', 'https://www.almanac.com/plant/chinese-evergreen') on conflict (id) do update set titulo = excluded.titulo, veiculo = excluded.veiculo, url = excluded.url;
insert into public.fontes (id, titulo, veiculo, url) values ('gardeners-babosa', 'Aloe Vera Care — luz, rega e colheita do gel', 'Gardener’s Supply Company', 'https://www.gardeners.com/blogs/houseplant-encyclopedia/aloe-vera-care-9698') on conflict (id) do update set titulo = excluded.titulo, veiculo = excluded.veiculo, url = excluded.url;
insert into public.fontes (id, titulo, veiculo, url) values ('almanac-babosa', 'How to Care for Aloe Vera Plants', 'The Old Farmer’s Almanac', 'https://www.almanac.com/plant/aloe-vera') on conflict (id) do update set titulo = excluded.titulo, veiculo = excluded.veiculo, url = excluded.url;
insert into public.fontes (id, titulo, veiculo, url) values ('bv-clorofito', 'Spider Plant Care — luz, rega, flúor e segurança com pets', 'Bob Vila', 'https://www.bobvila.com/articles/spider-plant-care') on conflict (id) do update set titulo = excluded.titulo, veiculo = excluded.veiculo, url = excluded.url;
insert into public.fontes (id, titulo, veiculo, url) values ('clemson-iniciantes', 'Exciting Houseplant Selections for Beginners', 'Clemson Cooperative Extension — HGIC', 'https://hgic.clemson.edu/exciting-houseplant-selections-for-beginners/') on conflict (id) do update set titulo = excluded.titulo, veiculo = excluded.veiculo, url = excluded.url;
insert into public.fontes (id, titulo, veiculo, url) values ('hunker-clorofito', 'How to Care for a Spider Plant — porte adulto', 'Hunker', 'https://www.hunker.com/12113186/how-to-care-for-a-spider-plant') on conflict (id) do update set titulo = excluded.titulo, veiculo = excluded.veiculo, url = excluded.url;
insert into public.fontes (id, titulo, veiculo, url) values ('rhs-manjericao', 'How to Grow Basil', 'Royal Horticultural Society', 'https://www.rhs.org.uk/herbs/basil') on conflict (id) do update set titulo = excluded.titulo, veiculo = excluded.veiculo, url = excluded.url;
insert into public.fontes (id, titulo, veiculo, url) values ('uc-manjericao', 'Basil — guia de cultivo', 'UC Master Gardeners, Santa Clara County', 'https://mgsantaclara.ucanr.edu/garden-help/herbs/basil') on conflict (id) do update set titulo = excluded.titulo, veiculo = excluded.veiculo, url = excluded.url;
insert into public.plantas (id, nome, cientifico, resumo, arquetipo, dificuldade, preco_base,
 altura_min_cm, altura_max_cm, largura_min_cm, largura_max_cm, porte_classe, porte_texto,
 rega_dias_min, rega_dias_max, rega_texto, rega_inverno,
 luz_nivel, luz_horas_min, luz_horas_max, luz_texto,
 ambiente_interno, ambiente_externo, umidade_min_pct, umidade_max_pct, temp_min_c, temp_max_c, ambiente_texto,
 cheiro_tem, cheiro_nota, cheiro_intensidade, cheiro_texto,
 agrega, agrega_texto, lugares, lugares_texto, pet, pet_texto, paleta) values (
 'espada-de-sao-jorge', 'Espada-de-são-jorge', 'Dracaena trifasciata', 'Folha ereta, rígida, de borda clara. Aguenta semanas sem água e luz fraca: é a planta para quem viaja.', 'rosetaLancas', 1, 69,
 60, 120, 25, 45, 'medio', 'Dentro de casa fica entre 60 cm e 1,2 m. A variedade anã “Hahnii” para em 15 a 30 cm.',
 14, 56, 'Regue só quando o substrato estiver seco: de 2 a 8 semanas, conforme a luz e o calor. Excesso de água apodrece a raiz.', 'Reduza quase pela metade no frio.',
 3, null, null, 'Prefere luz indireta forte e tolera sombra parcial. Sol direto forte queima a folha.',
 true, false, null, null, 18, 29, 'Ambiente interno seco, sem corrente de ar frio. Não exige umidade nenhuma.',
 false, 'sem cheiro', 0, 'A folhagem não tem cheiro. A floração é rara dentro de casa.',
 array['Linhas verticais num canto estreito', 'Perdoa esquecimento de rega', 'Aparece na lista de plantas testadas pela NASA em 1989 — veja a ressalva sobre ar']::text[], 'Estrutura e verticalidade. Sobre purificar o ar: o teste de 1989 foi em câmara selada e a revisão de 2020 concluiu que, num quarto real, a troca de ar da casa faz o trabalho.', '[{"lugar":"Quarto","porque":"aguenta a luz fraca de quarto com janela pequena"},{"lugar":"Corredor","porque":"ocupa pouca largura e não pede atenção"},{"lugar":"Escritório","porque":"sobrevive a ar-condicionado e a fins de semana sem ninguém"}]'::jsonb, 'Vai bem em qualquer canto com alguma luz. Evite banheiro muito úmido e fechado.',
 'toxico', 'Listada como tóxica para cães e gatos. Mantenha fora do alcance.', '{"folha":"#2f5d33","folha2":"#b9cf6a","caule":"#2f5d33","vaso":"#c9c2b4"}'::jsonb)
 on conflict (id) do update set nome = excluded.nome, preco_base = excluded.preco_base;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('espada-de-sao-jorge', 'costa-espada', 'porte') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('espada-de-sao-jorge', 'costa-espada', 'rega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('espada-de-sao-jorge', 'gkh-espada', 'rega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('espada-de-sao-jorge', 'costa-espada', 'luz') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('espada-de-sao-jorge', 'gkh-espada', 'luz') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('espada-de-sao-jorge', 'costa-espada', 'ambiente') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('espada-de-sao-jorge', 'costa-espada', 'cheiro') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('espada-de-sao-jorge', 'nasa89', 'agrega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('espada-de-sao-jorge', 'drexel20', 'agrega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('espada-de-sao-jorge', 'costa-espada', 'lugares') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('espada-de-sao-jorge', 'gkh-espada', 'lugares') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('espada-de-sao-jorge', 'aspca', 'pet') on conflict do nothing;
insert into public.plantas (id, nome, cientifico, resumo, arquetipo, dificuldade, preco_base,
 altura_min_cm, altura_max_cm, largura_min_cm, largura_max_cm, porte_classe, porte_texto,
 rega_dias_min, rega_dias_max, rega_texto, rega_inverno,
 luz_nivel, luz_horas_min, luz_horas_max, luz_texto,
 ambiente_interno, ambiente_externo, umidade_min_pct, umidade_max_pct, temp_min_c, temp_max_c, ambiente_texto,
 cheiro_tem, cheiro_nota, cheiro_intensidade, cheiro_texto,
 agrega, agrega_texto, lugares, lugares_texto, pet, pet_texto, paleta) values (
 'jiboia', 'Jiboia', 'Epipremnum aureum', 'Trepadeira de folha marmorizada. Pende de estante ou sobe em tutor de musgo, e cresce rápido o ano todo.', 'trepadeiraPendente', 1, 49,
 30, 200, 40, 90, 'medio', 'Ramo pendente de 1 a 2 m dentro de casa. Em planta adulta, a folha chega a 90 cm de comprimento.',
 7, 14, 'Regue quando os primeiros centímetros secarem. Substrato com drenagem livre, para a raiz não ficar encharcada.', 'Espere o substrato secar mais antes de molhar.',
 2, null, null, 'Luz indireta clara dá o melhor desenho na folha, mas tolera ambiente de pouca luz. Sol direto queima.',
 true, false, 40, 60, 18, 28, 'Interno, quente. Aceita o banheiro e a cozinha, onde o vapor ajuda.',
 false, 'sem cheiro', 0, 'Sem cheiro. Não floresce dentro de casa.',
 array['Preenche altura e vão de estante', 'Dá muda fácil: um galho na água cria raiz', 'Resiste a pragas e doenças']::text[], 'Volume verde barato e rápido. A RHS a classifica como “geralmente livre de pragas e de doenças”.', '[{"lugar":"Estante alta da sala","porque":"o ramo pendente ocupa o vão vertical"},{"lugar":"Banheiro com janela","porque":"o vapor do banho substitui a borrifada"},{"lugar":"Cozinha","porque":"aguenta a variação de calor perto da pia"}]'::jsonb, 'Suporte de tutor de musgo para subir, ou pendente livre.',
 'toxico', 'Tóxica para cães e gatos se mastigada. Evite ramo pendente ao alcance do bicho.', '{"folha":"#4b8c3b","folha2":"#e4df8b","caule":"#6f9b4a","vaso":"#b9b0a0"}'::jsonb)
 on conflict (id) do update set nome = excluded.nome, preco_base = excluded.preco_base;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('jiboia', 'rhs-jiboia-ficha', 'porte') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('jiboia', 'rhs-jiboia-guia', 'rega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('jiboia', 'rhs-jiboia-guia', 'luz') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('jiboia', 'rhs-jiboia-guia', 'ambiente') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('jiboia', 'rhs-jiboia-ficha', 'cheiro') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('jiboia', 'rhs-jiboia-ficha', 'agrega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('jiboia', 'rhs-jiboia-ficha', 'lugares') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('jiboia', 'aspca', 'pet') on conflict do nothing;
insert into public.plantas (id, nome, cientifico, resumo, arquetipo, dificuldade, preco_base,
 altura_min_cm, altura_max_cm, largura_min_cm, largura_max_cm, porte_classe, porte_texto,
 rega_dias_min, rega_dias_max, rega_texto, rega_inverno,
 luz_nivel, luz_horas_min, luz_horas_max, luz_texto,
 ambiente_interno, ambiente_externo, umidade_min_pct, umidade_max_pct, temp_min_c, temp_max_c, ambiente_texto,
 cheiro_tem, cheiro_nota, cheiro_intensidade, cheiro_texto,
 agrega, agrega_texto, lugares, lugares_texto, pet, pet_texto, paleta) values (
 'zamioculca', 'Zamioculca', 'Zamioculcas zamiifolia', 'Folha grossa e encerada que guarda água no rizoma. A planta que mais perdoa: pouca luz, pouca rega.', 'penaComposta', 1, 119,
 60, 90, 50, 80, 'medio', 'Chega a 90 cm em vaso, devagar. A variedade “Zamicro” fica abaixo de 60 cm.',
 14, 21, 'Regue quando os 5 a 7 cm de cima estiverem secos: cerca de 2 a 3 semanas. Quanto menos luz, menos água.', 'No frio e na sombra, pode passar de 3 semanas.',
 2, null, null, 'Sobrevive em luz baixa, cresce melhor em luz média a clara e indireta. Sol direto queima a folha.',
 true, false, null, null, 18, 26, 'Interno, seco, estável. Não precisa de borrifada nem de umidificador.',
 false, 'sem cheiro', 0, 'Sem cheiro na folha. Floração discreta e rara dentro de casa.',
 array['Brilho: a folha encerada reflete a luz do ambiente', 'Sobrevive a corredor sem janela', 'Crescimento lento: o desenho do vaso dura anos igual']::text[], 'Presença escultural num ponto que nenhuma outra planta aceita.', '[{"lugar":"Hall de entrada","porque":"luz indireta fraca e passagem de gente não a incomodam"},{"lugar":"Escritório","porque":"aguenta semanas sem rega e luz de lâmpada"},{"lugar":"Sala de jantar","porque":"folha brilhante rende bem perto de luminária"}]'::jsonb, 'Qualquer ponto interno com alguma luz. Evite sol direto da tarde.',
 'toxico', 'A seiva tem cristais de oxalato de cálcio: mastigar causa irritação na boca e mal-estar em pets e crianças.', '{"folha":"#245c2c","caule":"#3b7a3a","vaso":"#8d8577"}'::jsonb)
 on conflict (id) do update set nome = excluded.nome, preco_base = excluded.preco_base;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('zamioculca', 'gw-zamio', 'porte') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('zamioculca', 'ill-zamio', 'porte') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('zamioculca', 'gw-zamio', 'rega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('zamioculca', 'gw-zamio', 'luz') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('zamioculca', 'ill-zamio', 'luz') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('zamioculca', 'gw-zamio', 'ambiente') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('zamioculca', 'gw-zamio', 'cheiro') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('zamioculca', 'ill-zamio', 'agrega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('zamioculca', 'ill-zamio', 'lugares') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('zamioculca', 'ill-zamio', 'pet') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('zamioculca', 'aspca', 'pet') on conflict do nothing;
insert into public.plantas (id, nome, cientifico, resumo, arquetipo, dificuldade, preco_base,
 altura_min_cm, altura_max_cm, largura_min_cm, largura_max_cm, porte_classe, porte_texto,
 rega_dias_min, rega_dias_max, rega_texto, rega_inverno,
 luz_nivel, luz_horas_min, luz_horas_max, luz_texto,
 ambiente_interno, ambiente_externo, umidade_min_pct, umidade_max_pct, temp_min_c, temp_max_c, ambiente_texto,
 cheiro_tem, cheiro_nota, cheiro_intensidade, cheiro_texto,
 agrega, agrega_texto, lugares, lugares_texto, pet, pet_texto, paleta) values (
 'lirio-da-paz', 'Lírio-da-paz', 'Spathiphyllum wallisii', 'A única que floresce branco em luz fraca. Avisa quando está com sede: a folha cai e levanta depois da rega.', 'espataLarga', 2, 59,
 30, 120, 40, 90, 'medio', 'Entre 30 cm e 1,2 m dentro de casa, conforme a variedade e o vaso.',
 5, 10, 'Regue quando a superfície estiver seca ao toque. Aguenta melhor a falta do que o excesso de água. A folha caída é o aviso.', 'Espere a superfície secar; no frio demora mais.',
 1, null, null, 'Luz baixa a média. Folha amarela indica luz demais; risco marrom é queimadura de sol direto.',
 true, false, 50, 70, 18, 27, 'Gosta de ar úmido. Borrifada, umidificador ou um banheiro com luz resolvem.',
 false, 'sem cheiro marcante', 0, 'Folha e flor não perfumam o ambiente.',
 array['Flor branca em ponto de pouca luz', 'Indicador visível de rega: a folha cai antes de sofrer', 'Entrou no teste da NASA de 1989 para benzeno e formaldeído — leia a ressalva']::text[], 'Floração onde quase nada floresce. Sobre o ar: o teste de 1989 foi em câmara selada; a revisão de 2020 mostrou que a troca de ar de uma casa real supera o efeito das plantas em vaso.', '[{"lugar":"Banheiro com janela","porque":"o vapor cobre a umidade que ela pede"},{"lugar":"Quarto","porque":"floresce mesmo longe da janela"},{"lugar":"Escritório","porque":"aceita luz de lâmpada e pouca luz natural"}]'::jsonb, 'Longe de sol direto e de corrente de ar seco.',
 'toxico', 'Levemente tóxica para pets e pessoas. Mantenha fora do alcance.', '{"folha":"#1f5130","caule":"#2d6b39","flor":"#f6f4ec","vaso":"#9aa79b"}'::jsonb)
 on conflict (id) do update set nome = excluded.nome, preco_base = excluded.preco_base;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('lirio-da-paz', 'epic-lirio', 'porte') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('lirio-da-paz', 'epic-lirio', 'rega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('lirio-da-paz', 'epic-lirio', 'luz') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('lirio-da-paz', 'epic-lirio', 'ambiente') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('lirio-da-paz', 'epic-lirio', 'cheiro') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('lirio-da-paz', 'nasa89', 'agrega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('lirio-da-paz', 'drexel20', 'agrega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('lirio-da-paz', 'hg-lirio', 'agrega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('lirio-da-paz', 'epic-lirio', 'lugares') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('lirio-da-paz', 'aspca', 'pet') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('lirio-da-paz', 'epic-lirio', 'pet') on conflict do nothing;
insert into public.plantas (id, nome, cientifico, resumo, arquetipo, dificuldade, preco_base,
 altura_min_cm, altura_max_cm, largura_min_cm, largura_max_cm, porte_classe, porte_texto,
 rega_dias_min, rega_dias_max, rega_texto, rega_inverno,
 luz_nivel, luz_horas_min, luz_horas_max, luz_texto,
 ambiente_interno, ambiente_externo, umidade_min_pct, umidade_max_pct, temp_min_c, temp_max_c, ambiente_texto,
 cheiro_tem, cheiro_nota, cheiro_intensidade, cheiro_texto,
 agrega, agrega_texto, lugares, lugares_texto, pet, pet_texto, paleta) values (
 'costela-de-adao', 'Costela-de-adão', 'Monstera deliciosa', 'Folha recortada do tamanho de uma bandeja. Com tutor para subir, vira o móvel mais alto da sala.', 'folhaFenestrada', 2, 189,
 120, 240, 90, 240, 'grande', 'De 1,8 a 2,4 m dentro de casa, com 90 cm a 2,4 m de largura. Na natureza passa de 9 m.',
 7, 14, 'Deixe os 5 cm de cima secarem antes de regar de novo. Excesso de água apodrece a raiz.', 'Menos água no outono e no inverno, quando para de crescer.',
 3, null, null, 'Luz indireta clara. Tolera ambiente mais escuro, mas fica menor e a folha recorta menos.',
 true, false, 40, 60, 16, 24, 'Aceita a umidade comum de casa (40% a 50%) e prefere mais. Não deixe abaixo de 13 °C.',
 false, 'sem cheiro', 0, 'Sem cheiro dentro de casa.',
 array['Escala: preenche um canto de 2 m sozinha', 'Sombra desenhada na parede quando recebe luz lateral', 'Folha nova a cada poucas semanas no verão']::text[], 'É o ponto focal da sala, não um detalhe.', '[{"lugar":"Canto da sala perto de janela","porque":"precisa de luz lateral clara e espaço de 1 m"},{"lugar":"Vão de escada","porque":"aproveita pé-direito alto para subir no tutor"}]'::jsonb, 'Longe de aquecedor e de ar seco, que deixam a ponta da folha marrom.',
 'toxico', 'Tóxica se ingerida e a seiva irrita a pele. Longe de pets e crianças.', '{"folha":"#2d7439","caule":"#3f7a3c","vaso":"#8e8a7d"}'::jsonb)
 on conflict (id) do update set nome = excluded.nome, preco_base = excluded.preco_base;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('costela-de-adao', 'gkh-monstera', 'porte') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('costela-de-adao', 'epic-monstera', 'rega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('costela-de-adao', 'gkh-monstera', 'rega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('costela-de-adao', 'gkh-monstera', 'luz') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('costela-de-adao', 'epic-monstera', 'ambiente') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('costela-de-adao', 'gkh-monstera', 'cheiro') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('costela-de-adao', 'epic-monstera', 'agrega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('costela-de-adao', 'epic-monstera', 'lugares') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('costela-de-adao', 'epic-monstera', 'pet') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('costela-de-adao', 'aspca', 'pet') on conflict do nothing;
insert into public.plantas (id, nome, cientifico, resumo, arquetipo, dificuldade, preco_base,
 altura_min_cm, altura_max_cm, largura_min_cm, largura_max_cm, porte_classe, porte_texto,
 rega_dias_min, rega_dias_max, rega_texto, rega_inverno,
 luz_nivel, luz_horas_min, luz_horas_max, luz_texto,
 ambiente_interno, ambiente_externo, umidade_min_pct, umidade_max_pct, temp_min_c, temp_max_c, ambiente_texto,
 cheiro_tem, cheiro_nota, cheiro_intensidade, cheiro_texto,
 agrega, agrega_texto, lugares, lugares_texto, pet, pet_texto, paleta) values (
 'lavanda', 'Lavanda', 'Lavandula angustifolia', 'Cheiro de lavanda ao passar a mão na folha. Em troca, exige a janela mais ensolarada da casa.', 'arbustoEspigas', 3, 54,
 30, 60, 30, 50, 'pequeno', 'A espécie chega a 60 a 90 cm; para vaso dentro de casa use as variedades compactas, como “Hidcote”.',
 10, 14, 'Deixe os 5 cm de cima secarem por completo entre as regas. Drenagem é o fator que decide se ela vive.', 'Reduza muito a rega nos meses frios.',
 4, 3, 8, 'Sol direto: no mínimo 3 h por dia, e de 6 a 8 h para florescer bem. Sem isso ela estica e não dá flor.',
 true, true, 30, 45, 13, 24, 'Quer ar seco e circulando, entre 13 °C e 24 °C. Varanda e janelão são melhores que o meio da sala.',
 true, 'floral herbáceo, canforado', 3, 'Folha e flor são aromáticas: o cheiro sai ao toque e seca bem em buquê.',
 array['Perfume que se solta ao passar a mão', 'Flor seca que dura meses depois do corte', 'Cor roxa fria no meio do verde']::text[], 'É a planta de cheiro da casa, não a de preencher canto escuro.', '[{"lugar":"Janela mais ensolarada","porque":"no Brasil, em geral a voltada para o norte"},{"lugar":"Varanda","porque":"sol direto e ar circulando, como ela pede"},{"lugar":"Beira da pia da cozinha","porque":"cheiro à mão e sol de manhã"}]'::jsonb, 'Sem sol direto, não vale a pena: ela sobrevive sem florir.',
 'atencao', 'O óleo essencial da lavanda é irritante para cães e gatos se ingerido em quantidade.', '{"folha":"#7f9479","caule":"#8a9a7c","flor":"#7b5ea7","vaso":"#c7b9a1"}'::jsonb)
 on conflict (id) do update set nome = excluded.nome, preco_base = excluded.preco_base;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('lavanda', 'gardenia-lavanda', 'porte') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('lavanda', 'bv-lavanda', 'porte') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('lavanda', 'bv-lavanda', 'rega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('lavanda', 'gardenia-lavanda', 'rega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('lavanda', 'bv-lavanda', 'luz') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('lavanda', 'gardenia-lavanda', 'luz') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('lavanda', 'gardenia-lavanda', 'ambiente') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('lavanda', 'bv-lavanda', 'cheiro') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('lavanda', 'bv-lavanda', 'agrega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('lavanda', 'bv-lavanda', 'lugares') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('lavanda', 'gardenia-lavanda', 'lugares') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('lavanda', 'aspca', 'pet') on conflict do nothing;
insert into public.plantas (id, nome, cientifico, resumo, arquetipo, dificuldade, preco_base,
 altura_min_cm, altura_max_cm, largura_min_cm, largura_max_cm, porte_classe, porte_texto,
 rega_dias_min, rega_dias_max, rega_texto, rega_inverno,
 luz_nivel, luz_horas_min, luz_horas_max, luz_texto,
 ambiente_interno, ambiente_externo, umidade_min_pct, umidade_max_pct, temp_min_c, temp_max_c, ambiente_texto,
 cheiro_tem, cheiro_nota, cheiro_intensidade, cheiro_texto,
 agrega, agrega_texto, lugares, lugares_texto, pet, pet_texto, paleta) values (
 'jasmim', 'Jasmim-dos-poetas', 'Jasminum polyanthum', 'Trepadeira de flor pequena e perfume que toma a casa inteira. Só floresce depois de um período frio.', 'trepadeiraFlorida', 3, 79,
 30, 180, 40, 80, 'medio', 'Em vaso com treliça, de 1 a 3 m conduzida; vendida em 30 a 90 cm. Solta e pendente também funciona.',
 5, 7, 'Substrato úmido, nunca encharcado. Em vaso seca mais rápido que no chão, então cheque com o dedo.', 'Segure a água quando o crescimento parar no frio.',
 4, 2, 4, 'Luz é o que decide a floração. Sol direto suave da manhã, em janela leste; sol forte queima a folha.',
 true, true, 40, 60, 4, 24, 'Para formar botão precisa de 6 a 8 semanas entre 4 °C e 13 °C, ou noites consistentes abaixo de 15 °C. No Brasil isso quer dizer inverno de região fria, varanda ou serra.',
 true, 'doce, intenso, de noite mais forte', 3, 'Perfume forte o bastante para ocupar uma casa inteira com uma planta só.',
 array['Perfume de inverno dentro de casa', 'Floração branca em massa sobre treliça', 'Pode ser conduzida em arco, cesta ou tutor']::text[], 'Compre pela flor e pelo cheiro, não pela folhagem.', '[{"lugar":"Janela leste da sala","porque":"sol da manhã sem queimar e perfume no ambiente de estar"},{"lugar":"Varanda coberta","porque":"noite fria no outono é o que dispara os botões"}]'::jsonb, 'Longe de aquecedor: calor constante impede a floração.',
 'atencao', 'Jasmins verdadeiros não constam como tóxicos, mas plantas vendidas como “jasmim” variam de espécie: confira a etiqueta.', '{"folha":"#2f6b35","caule":"#5c7a3a","flor":"#fdf7f2","vaso":"#bfae95"}'::jsonb)
 on conflict (id) do update set nome = excluded.nome, preco_base = excluded.preco_base;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('jasmim', 'logees-jasmim', 'porte') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('jasmim', 'wff-jasmim', 'porte') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('jasmim', 'wff-jasmim', 'rega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('jasmim', 'nybg-jasmim', 'rega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('jasmim', 'nybg-jasmim', 'luz') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('jasmim', 'wff-jasmim', 'luz') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('jasmim', 'wff-jasmim', 'ambiente') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('jasmim', 'wff-jasmim', 'cheiro') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('jasmim', 'wff-jasmim', 'agrega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('jasmim', 'nybg-jasmim', 'agrega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('jasmim', 'wff-jasmim', 'lugares') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('jasmim', 'aspca', 'pet') on conflict do nothing;
insert into public.plantas (id, nome, cientifico, resumo, arquetipo, dificuldade, preco_base,
 altura_min_cm, altura_max_cm, largura_min_cm, largura_max_cm, porte_classe, porte_texto,
 rega_dias_min, rega_dias_max, rega_texto, rega_inverno,
 luz_nivel, luz_horas_min, luz_horas_max, luz_texto,
 ambiente_interno, ambiente_externo, umidade_min_pct, umidade_max_pct, temp_min_c, temp_max_c, ambiente_texto,
 cheiro_tem, cheiro_nota, cheiro_intensidade, cheiro_texto,
 agrega, agrega_texto, lugares, lugares_texto, pet, pet_texto, paleta) values (
 'samambaia', 'Samambaia-americana', 'Nephrolepis exaltata ''Bostoniensis''', 'Fronde arqueada que cai em cascata. Quer ar úmido: é a planta de banheiro com janela.', 'frondeSamambaia', 2, 45,
 30, 60, 60, 90, 'pequeno', 'De 30 a 60 cm de altura, com fronde caindo bem além da borda do vaso.',
 3, 7, 'Regue quando o primeiro centímetro de substrato secar. Encharcar apodrece a raiz; secar derruba os folíolos.', 'Uma vez por semana nos meses frios.',
 2, null, null, 'Luz indireta clara, sem sol do meio-dia nem da tarde. Sol fraco do início da manhã é tolerado.',
 true, true, 40, 50, 16, 24, 'Umidade de 30% é o limite que ela tolera; 40% a 50% é a faixa desejável. Bandeja com pedras, umidificador ou banheiro resolvem.',
 false, 'sem cheiro', 0, 'Sem cheiro. Não floresce: é uma pteridófita, reproduz por esporo.',
 array['Textura miúda que contrasta com folha grande', 'Volume pendente em suporte suspenso', 'Não é tóxica para cães e gatos']::text[], 'Maciez visual e segurança com pets no mesmo vaso.', '[{"lugar":"Banheiro com janela","porque":"o vapor do banho entrega a umidade que ela exige"},{"lugar":"Varanda coberta","porque":"luz indireta e ar úmido sem sol direto"},{"lugar":"Cozinha","porque":"o vapor do cozimento ajuda, longe da boca do fogão"}]'::jsonb, 'Fuja de ar-condicionado apontado para ela e de janela de sol pleno.',
 'seguro', 'Listada como não tóxica para cães e gatos.', '{"folha":"#4f8f3e","folha2":"#7fb04a","caule":"#6f8f3c","vaso":"#a89e8c"}'::jsonb)
 on conflict (id) do update set nome = excluded.nome, preco_base = excluded.preco_base;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('samambaia', 'bv-samambaia', 'porte') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('samambaia', 'bv-samambaia', 'rega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('samambaia', 'purdue-samambaia', 'rega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('samambaia', 'bv-samambaia', 'luz') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('samambaia', 'purdue-samambaia', 'ambiente') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('samambaia', 'purdue-samambaia', 'cheiro') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('samambaia', 'bv-samambaia', 'agrega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('samambaia', 'bv-samambaia', 'lugares') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('samambaia', 'purdue-samambaia', 'lugares') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('samambaia', 'aspca', 'pet') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('samambaia', 'bv-samambaia', 'pet') on conflict do nothing;
insert into public.plantas (id, nome, cientifico, resumo, arquetipo, dificuldade, preco_base,
 altura_min_cm, altura_max_cm, largura_min_cm, largura_max_cm, porte_classe, porte_texto,
 rega_dias_min, rega_dias_max, rega_texto, rega_inverno,
 luz_nivel, luz_horas_min, luz_horas_max, luz_texto,
 ambiente_interno, ambiente_externo, umidade_min_pct, umidade_max_pct, temp_min_c, temp_max_c, ambiente_texto,
 cheiro_tem, cheiro_nota, cheiro_intensidade, cheiro_texto,
 agrega, agrega_texto, lugares, lugares_texto, pet, pet_texto, paleta) values (
 'aglaonema', 'Aglaonema', 'Aglaonema commutatum', 'Folha pintada de prata, rosa ou creme. Entre as plantas de folhagem, é a que menos exige luz.', 'folhaPintada', 1, 89,
 30, 60, 30, 60, 'pequeno', 'Compacta e de crescimento lento: as folhas saem de pecíolos curtos, perto do substrato.',
 10, 14, 'Substrato que drena livre, mas retém alguma umidade. Secar demais ou ar muito seco atraem ácaro e pulgão.', 'Espere secar mais; no frio ela quase para.',
 1, null, null, 'Luz baixa a média, sempre indireta. Não deixe no peitoril da janela, onde pega sol direto.',
 true, false, 40, 60, 18, 27, 'Interno, quente. Nunca abaixo de 15 °C.',
 false, 'sem cheiro', 0, 'Sem cheiro. A inflorescência é discreta, do tipo espata.',
 array['Cor na folha sem depender de flor', 'Funciona em ponto escuro onde outras desbotam', 'Mantém o mesmo porte por anos']::text[], 'Cor em ambiente sem luz: o que nenhuma floração entrega ali.', '[{"lugar":"Hall de entrada","porque":"luz baixa e indireta é exatamente o que ela prefere"},{"lugar":"Escritório longe da janela","porque":"aceita luz de lâmpada e temperatura estável"},{"lugar":"Mesa de apoio da sala","porque":"porte baixo e folha colorida a meia altura"}]'::jsonb, 'Longe de ar-condicionado frio e de sol direto.',
 'toxico', 'Listada como tóxica para cães, gatos e cavalos.', '{"folha":"#2a5a39","folha2":"#cfd8c0","caule":"#4a7045","vaso":"#8f8878"}'::jsonb)
 on conflict (id) do update set nome = excluded.nome, preco_base = excluded.preco_base;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('aglaonema', 'clemson-aglaonema', 'porte') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('aglaonema', 'clemson-aglaonema', 'rega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('aglaonema', 'clemson-aglaonema', 'luz') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('aglaonema', 'almanac-aglaonema', 'luz') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('aglaonema', 'almanac-aglaonema', 'ambiente') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('aglaonema', 'clemson-aglaonema', 'cheiro') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('aglaonema', 'clemson-aglaonema', 'agrega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('aglaonema', 'clemson-aglaonema', 'lugares') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('aglaonema', 'almanac-aglaonema', 'lugares') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('aglaonema', 'aspca', 'pet') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('aglaonema', 'clemson-aglaonema', 'pet') on conflict do nothing;
insert into public.plantas (id, nome, cientifico, resumo, arquetipo, dificuldade, preco_base,
 altura_min_cm, altura_max_cm, largura_min_cm, largura_max_cm, porte_classe, porte_texto,
 rega_dias_min, rega_dias_max, rega_texto, rega_inverno,
 luz_nivel, luz_horas_min, luz_horas_max, luz_texto,
 ambiente_interno, ambiente_externo, umidade_min_pct, umidade_max_pct, temp_min_c, temp_max_c, ambiente_texto,
 cheiro_tem, cheiro_nota, cheiro_intensidade, cheiro_texto,
 agrega, agrega_texto, lugares, lugares_texto, pet, pet_texto, paleta) values (
 'babosa', 'Babosa', 'Aloe vera', 'Suculenta de folha carnuda com gel dentro. Quer sol e quase nenhuma água.', 'rosetaSuculenta', 1, 39,
 30, 60, 30, 60, 'pequeno', 'Dentro de casa fica em 30 a 60 cm, e pode chegar a 90 cm com o tempo.',
 14, 21, 'Deixe o substrato secar inteiro antes de regar. Dentro de casa ela pede ainda menos água do que fora.', 'Quase nada: o substrato precisa secar por completo.',
 4, 6, 8, 'Luz forte, no mínimo 6 h por dia; a janela mais ensolarada é o lugar certo. Em luz baixa ela estica e tomba.',
 true, true, 20, 45, 15, 30, 'Ar seco, calor, vaso com dreno. Não tolera substrato encharcado.',
 true, 'vegetal e amargo, só ao cortar a folha', 1, 'Fechada não tem cheiro; cortada, solta aroma vegetal e amargo da seiva.',
 array['Gel para queimadura leve, corte e irritação de pele', 'Forma geométrica que contrasta com folhagem solta', 'Sobrevive a férias longas']::text[], 'Colha as folhas de fora quando a planta tiver 3 anos; o gel guarda até 2 semanas na geladeira em pote fechado.', '[{"lugar":"Janela mais ensolarada","porque":"é a condição que ela exige para não esticar"},{"lugar":"Cozinha","porque":"gel à mão para queimadura de fogão, com sol da janela"},{"lugar":"Varanda","porque":"sol pleno e ar seco"}]'::jsonb, 'Evite banheiro úmido e canto escuro.',
 'atencao', 'A seiva amarela sob a casca da folha é irritante se ingerida. Mantenha fora do alcance de pets e crianças.', '{"folha":"#6f9d6a","folha2":"#cfe0b4","caule":"#6f9d6a","vaso":"#c0b7a6"}'::jsonb)
 on conflict (id) do update set nome = excluded.nome, preco_base = excluded.preco_base;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('babosa', 'gardeners-babosa', 'porte') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('babosa', 'gardeners-babosa', 'rega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('babosa', 'gardeners-babosa', 'luz') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('babosa', 'gardeners-babosa', 'ambiente') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('babosa', 'almanac-babosa', 'ambiente') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('babosa', 'almanac-babosa', 'cheiro') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('babosa', 'gardeners-babosa', 'agrega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('babosa', 'gardeners-babosa', 'lugares') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('babosa', 'aspca', 'pet') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('babosa', 'almanac-babosa', 'pet') on conflict do nothing;
insert into public.plantas (id, nome, cientifico, resumo, arquetipo, dificuldade, preco_base,
 altura_min_cm, altura_max_cm, largura_min_cm, largura_max_cm, porte_classe, porte_texto,
 rega_dias_min, rega_dias_max, rega_texto, rega_inverno,
 luz_nivel, luz_horas_min, luz_horas_max, luz_texto,
 ambiente_interno, ambiente_externo, umidade_min_pct, umidade_max_pct, temp_min_c, temp_max_c, ambiente_texto,
 cheiro_tem, cheiro_nota, cheiro_intensidade, cheiro_texto,
 agrega, agrega_texto, lugares, lugares_texto, pet, pet_texto, paleta) values (
 'clorofito', 'Clorofito', 'Chlorophytum comosum', 'Folha listrada e arqueada que solta mudas penduradas. Não é tóxica para cães e gatos.', 'arqueadaFilhotes', 1, 35,
 38, 60, 40, 70, 'pequeno', 'Entre 38 e 60 cm, com as hastes de muda caindo bem mais para fora do vaso.',
 7, 10, 'Regue quando o primeiro centímetro secar. Ela é sensível a flúor: água filtrada ou de chuva evita a ponta marrom.', 'Espere secar mais entre as regas.',
 3, null, null, 'Luz indireta clara. Em pouca luz a listra desaparece e a folha fica toda verde; sol direto demais queima.',
 true, true, 40, 60, 15, 27, 'Interno ou varanda sombreada. Em luz clara produz mais mudas.',
 false, 'sem cheiro', 0, 'Sem cheiro. A florzinha branca das hastes é discreta.',
 array['Mudas de graça: cada haste vira uma planta nova', 'Não é tóxica para cães e gatos', 'Movimento pendente em suporte suspenso']::text[], 'A escolha para casa com pet e para quem quer multiplicar sem comprar.', '[{"lugar":"Suporte suspenso perto da janela","porque":"as hastes de muda precisam de vão livre"},{"lugar":"Cozinha","porque":"luz clara e tolerância à variação de temperatura"},{"lugar":"Quarto de criança","porque":"não tóxica, ainda que folha solta seja risco de engasgo"}]'::jsonb, 'Sol direto do meio-dia queima a borda da folha.',
 'seguro', 'Não tóxica para cães e gatos. Gato costuma mastigar a folha; muita folha ingerida pode dar mal-estar leve.', '{"folha":"#4e8e42","folha2":"#eef2d8","caule":"#6f9b4a","vaso":"#b4aa98"}'::jsonb)
 on conflict (id) do update set nome = excluded.nome, preco_base = excluded.preco_base;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('clorofito', 'hunker-clorofito', 'porte') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('clorofito', 'bv-clorofito', 'rega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('clorofito', 'bv-clorofito', 'luz') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('clorofito', 'clemson-iniciantes', 'luz') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('clorofito', 'clemson-iniciantes', 'ambiente') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('clorofito', 'clemson-iniciantes', 'cheiro') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('clorofito', 'bv-clorofito', 'agrega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('clorofito', 'bv-clorofito', 'lugares') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('clorofito', 'aspca', 'pet') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('clorofito', 'bv-clorofito', 'pet') on conflict do nothing;
insert into public.plantas (id, nome, cientifico, resumo, arquetipo, dificuldade, preco_base,
 altura_min_cm, altura_max_cm, largura_min_cm, largura_max_cm, porte_classe, porte_texto,
 rega_dias_min, rega_dias_max, rega_texto, rega_inverno,
 luz_nivel, luz_horas_min, luz_horas_max, luz_texto,
 ambiente_interno, ambiente_externo, umidade_min_pct, umidade_max_pct, temp_min_c, temp_max_c, ambiente_texto,
 cheiro_tem, cheiro_nota, cheiro_intensidade, cheiro_texto,
 agrega, agrega_texto, lugares, lugares_texto, pet, pet_texto, paleta) values (
 'manjericao', 'Manjericão', 'Ocimum basilicum', 'Cheiro de molho de tomate na janela da cozinha. Colher folha com frequência é o que a mantém viva.', 'arbustoFolhasPares', 2, 25,
 30, 60, 20, 40, 'pequeno', 'De 30 a 60 cm em vaso. Poda frequente deixa a planta mais cheia e baixa.',
 3, 7, 'Uma a duas vezes por semana, variando com calor, umidade e tamanho do vaso. Cheque o substrato antes.', 'Menos água quando esfria e o crescimento para.',
 4, 6, 8, 'Precisa de 6 h ou mais de luz direta. Com menos, estica e empalidece; luz artificial supre com 10 a 16 h por dia.',
 true, true, 40, 60, 18, 29, 'Planta tropical: sofre abaixo de 10 °C e cresce melhor entre 21 °C e 29 °C. Não deixe a folha colada no vidro frio.',
 true, 'anisado, cravo, doce', 3, 'Cheiro forte na folha, liberado ao toque e ao corte.',
 array['Folha para cozinhar o ano todo', 'Cheiro ao esbarrar na planta', 'Colheita contínua: cortar faz crescer mais']::text[], 'Uma planta saudável na janela dá folha para uso diário na temporada.', '[{"lugar":"Janela da cozinha","porque":"sol direto e a folha ao alcance do fogão"},{"lugar":"Varanda ensolarada","porque":"mais sol, mais folha"}]'::jsonb, 'Longe de corrente de ar frio e do vidro gelado no inverno.',
 'seguro', 'Erva culinária, não listada como tóxica para cães e gatos.', '{"folha":"#3f7f32","folha2":"#79a94a","caule":"#6a8f3e","flor":"#f2eee0","vaso":"#b6472f"}'::jsonb)
 on conflict (id) do update set nome = excluded.nome, preco_base = excluded.preco_base;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('manjericao', 'rhs-manjericao', 'porte') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('manjericao', 'rhs-manjericao', 'rega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('manjericao', 'uc-manjericao', 'rega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('manjericao', 'uc-manjericao', 'luz') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('manjericao', 'rhs-manjericao', 'luz') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('manjericao', 'uc-manjericao', 'ambiente') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('manjericao', 'rhs-manjericao', 'cheiro') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('manjericao', 'rhs-manjericao', 'agrega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('manjericao', 'uc-manjericao', 'agrega') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('manjericao', 'uc-manjericao', 'lugares') on conflict do nothing;
insert into public.planta_fontes (planta_id, fonte_id, campo) values ('manjericao', 'aspca', 'pet') on conflict do nothing;
commit;
