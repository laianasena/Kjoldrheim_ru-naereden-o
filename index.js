let missions = [];
let achievements = [];
let debuffs = [];
let mission_selected;

const missionSelect = document.getElementById("missionSelect");
const missionContainer = document.getElementById("missionContainer");

// 🔹 Carregar o arquivo missoes.json dinamicamente
fetch("missoes.json")
  .then(response => {
    if (!response.ok) throw new Error("Erro ao carregar o arquivo missoes.json");
    return response.json();
  })
  .then(data => {
    missions = data;

    // Adiciona as missões no select
    missions.forEach(mission => {
      const option = document.createElement("option");
      option.value = mission.id;
      option.textContent = `Missão ${mission.id}`;
      missionSelect.appendChild(option);
    });

    // Renderiza a primeira missão automaticamente
    renderMission(missions[0].id);
  })
  .catch(err => {
    console.error("Erro ao carregar JSON:", err);
    missionContainer.innerHTML = `<div class="alert alert-danger">Erro ao carregar as missões 😢</div>`;
  });

// 🔹 Renderizar missão selecionada
function renderMission(missionId) {
  const mission = missions.find(m => m.id == missionId);
  if (!mission) return;

  mission_selected = mission;
  achievements = [];
  debuffs = [];

  missionContainer.innerHTML = `
    <div class="col-12">
      <div class="card h-100 shadow-sm">
        <div class="card-header bg-primary text-white">
          <h4>Missão ${mission.id} : ${mission.name}</h4>
        </div>
        <div class="card-body">

          <!-- Testes -->
          <div class="accordion" id="accordionPanelsStayTestes">
            ${mission.tests.map(teste => `
              <div class="accordion-item" id="test-${teste.id}">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed" type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayTeste${teste.id}-collapse"
                      aria-expanded="false"
                      aria-controls="panelsStayTeste${teste.id}-collapse">
                      <b>#${teste.id} - ${teste.description}</b>
                      <span class="status-icon ms-2"></span>
                  </button>
                </h2>
                <div id="panelsStayTeste${teste.id}-collapse" class="accordion-collapse collapse">
                  <div class="accordion-body">
                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <div class="card h-100">
                          <h5 class="p-2">
                            Sucesso
                            <input class="form-check-input ms-2" type="checkbox"
                              id="success-test-${teste.id}" data-type="success"
                              data-context="test" data-id="${teste.id}">
                          </h5>
                          <div class="card-body">
                            <p><strong>Benefícios:</strong> ${teste.success}</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6 mb-3">
                        <div class="card h-100">
                          <h5 class="p-2">
                            Falha
                            <input class="form-check-input ms-2" type="checkbox"
                              id="fail-test-${teste.id}" data-type="fail"
                              data-context="test" data-id="${teste.id}">
                          </h5>
                          <div class="card-body">
                            <p><strong>Punições:</strong> ${teste.fail}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>

          <!-- Eventos -->
          <div class="accordion" id="accordionPanelsStayEventosExample">
            ${mission.events.map(evento => `
              <div class="accordion-item" id="event-${evento.id}">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed" type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayEvento${evento.id}-collapse"
                    aria-expanded="false"
                    aria-controls="panelsStayEvento${evento.id}-collapse">
                    <b>#${evento.id} - ${evento.description}</b>
                    <span class="status-icon ms-2"></span>
                  </button>
                </h2>
                <div id="panelsStayEvento${evento.id}-collapse" class="accordion-collapse collapse">
                  <div class="accordion-body">
                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <div class="card h-100">
                          <h5 class="p-2">
                            Sucesso
                            <input class="form-check-input ms-2" type="checkbox"
                              id="success-event-${evento.id}" data-type="success"
                              data-context="event" data-id="${evento.id}">
                          </h5>
                          <div class="card-body">
                            <p><strong>Benefícios:</strong> ${evento.success}</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6 mb-3">
                        <div class="card h-100">
                          <h5 class="p-2">
                            Falha
                            <input class="form-check-input ms-2" type="checkbox"
                              id="fail-event-${evento.id}" data-type="fail"
                              data-context="event" data-id="${evento.id}">
                          </h5>
                          <div class="card-body">
                            <p><strong>Punições:</strong> ${evento.fail}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>

          <!-- Monstros -->
          <div class="accordion" id="accordionPanelsStayMonstrosExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#panelsStayMonstros-collapseOne"
                  aria-expanded="false"
                  aria-controls="panelsStayMonstros-collapseOne">
                  <h5><b>Monstros</b></h5>
                </button>
              </h2>

              <div id="panelsStayMonstros-collapseOne" class="accordion-collapse collapse">
                <div class="accordion-body">
                  <div class="row accordion-item border-0">
                    ${mission.monsters.map(mon => `
                      <div class="col-md-3 mb-3">
                        <div class="card h-100">
                          <div class="text-center">
                            <img src="${mon.img}" style="max-width: 250px;"
                              class="card-img-top img-fluid rounded" alt="${mon.name}">
                          </div>
                          <div class="card-body">
                            <h6 class="card-title">${mon.name}</h6>
                            <p><strong>Atenção:</strong> ${mon.description}</p>
                            <p><strong>Ataque:</strong> ${mon.attack}</p>
                            <p><strong>Buffs:</strong> ${mon.buffs.join(", ")}</p>
                            <p><strong>Debuffs:</strong> ${mon.debuffs.join(", ")}</p>
                          </div>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Boss -->
          ${mission.boss.length > 0 ? `
            <div class="accordion" id="accordionPanelsStayBossExample">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed" type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayBoss-collapseOne"
                    aria-expanded="false"
                    aria-controls="panelsStayBoss-collapseOne">
                    <h5><b>Boss</b></h5>
                  </button>
                </h2>
                <div id="panelsStayBoss-collapseOne" class="accordion-collapse collapse">
                  <div class="accordion-body">
                    ${mission.boss.map(b => `
                      <div class="row g-3 align-items-center">
                        <div class="col-md-4 text-center">
                          <img src="${b.img}" class="img-fluid rounded" alt="${b.name}" style="max-width: 250px;">
                        </div>
                        <div class="col-md-8">
                          <h5><b>Peculiaridades</b></h5>
                          <div class="card border-0">
                            <div class="card-body p-0">
                              <h6 class="card-title">${b.name}</h6>
                              <p><strong>Atenção:</strong> ${b.description}</p>
                              <p><strong>Ataque:</strong> ${b.attack}</p>
                              <p><strong>Buffs:</strong> ${b.buffs.join(", ")}</p>
                              <p><strong>Debuffs:</strong> ${b.debuffs.join(", ")}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    `).join("")}
                  </div>
                </div>
              </div>
            </div>
          ` : ""}
        </div>

        <!-- Resumo -->
        <div class="card-footer row mw-3">
          <div class="bg-light col-md-4">
            <h6>Recompensa da missão</h6>
            <p>
              Moedas: ${mission.reward.coins_per_hero || mission.reward.coins}<br>
              Pontos de Honra: ${mission.reward.honorPoints.base_if_resist || mission.reward.honorPoints}<br>
              Itens: ${mission.reward.items.join(", ")}<br>
              Experiência: ${mission.reward.experience.base || mission.reward.experience}
            </p>
          </div>
          <div class="bg-light col-md-4">
            <h6>Bônus de eventos e testes</h6>
            <p id="bonus-content">conteúdo: -</p>
          </div>
          <div class="bg-light col-md-4">
            <h6>Punições de eventos e testes</h6>
            <p id="fail-content">conteúdo: -</p>
          </div>
        </div>
      </div>
    </div>
  `;

  bindCheckboxListeners();
}

function bindCheckboxListeners() {
  document.querySelectorAll(".form-check-input").forEach(chk => {
    chk.addEventListener("change", function() {
      const itemId = this.dataset.id;
      const type = this.dataset.type;
      const context = this.dataset.context;
      const accItem = document.getElementById(`${context}-${itemId}`);
      const statusIcon = accItem.querySelector(".status-icon");
      const item = mission_selected[context + "s"].find(e => e.id == itemId);

      accItem.querySelector(".accordion-button").classList.remove("bg-success", "bg-danger", "text-white");
      statusIcon.textContent = "";

      if (type === "success") document.getElementById(`fail-${context}-${itemId}`).checked = false;
      if (type === "fail") document.getElementById(`success-${context}-${itemId}`).checked = false;

      if (type === "success") {
        if (this.checked) {
          achievements.push(item.success);
          statusIcon.textContent = "✅";
          accItem.querySelector(".accordion-button").classList.add("bg-success", "text-white");
        } else {
          achievements = achievements.filter(a => a !== item.success);
        }
      }

      if (type === "fail") {
        if (this.checked) {
          debuffs.push(item.fail);
          statusIcon.textContent = "❌";
          accItem.querySelector(".accordion-button").classList.add("bg-danger", "text-white");
        } else {
          debuffs = debuffs.filter(d => d !== item.fail);
        }
      }

      document.getElementById("bonus-content").textContent = `conteúdo: ${achievements.flat().join(", ") || "-"}`;
      document.getElementById("fail-content").textContent = `conteúdo: ${debuffs.flat().join(", ") || "-"}`;
    });
  });
}

// 🔹 Atualiza missão ao trocar no select
missionSelect.addEventListener("change", (e) => {
  renderMission(e.target.value);
});
