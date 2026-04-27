"use client";

import { useState } from "react";

const tabs = [
  {
    id: "earth",
    label: "Земля",
    title: "Планета Земля",
    subtitle:
      "Третья планета от Солнца и единственный известный дом жизни во Вселенной.",
    stats: [
      ["Диаметр", "12 742 км"],
      ["Сутки", "23 ч 56 мин"],
      ["Спутник", "Луна"],
    ],
    facts: [
      "Около 71% поверхности покрыто водой, поэтому Землю часто называют голубой планетой.",
      "Атмосфера защищает поверхность от большей части метеоритов и жесткого излучения.",
      "Магнитное поле помогает отклонять заряженные частицы солнечного ветра.",
    ],
    visualClass:
      "bg-[radial-gradient(circle_at_35%_30%,#d6f6ff_0_8%,#2dd4bf_9%_22%,#2563eb_23%_55%,#0f172a_56%_100%)]",
  },
  {
    id: "sun",
    label: "Солнце",
    title: "Солнце",
    subtitle:
      "Звезда в центре Солнечной системы, которая дает Земле свет, тепло и энергию.",
    stats: [
      ["Тип", "желтый карлик"],
      ["Диаметр", "1,39 млн км"],
      ["Возраст", "4,6 млрд лет"],
    ],
    facts: [
      "Солнце содержит более 99% массы всей Солнечной системы.",
      "Энергия рождается в ядре при термоядерном синтезе водорода в гелий.",
      "Солнечный свет достигает Земли примерно за 8 минут 20 секунд.",
    ],
    visualClass:
      "bg-[radial-gradient(circle,#fff7ad_0_12%,#facc15_13%_38%,#f97316_39%_62%,#7c2d12_63%_100%)]",
  },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("earth");
  const activeContent = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-8 sm:px-8 lg:px-10">
        <div className="flex flex-1 flex-col justify-center gap-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Космос рядом
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
              Земля и Солнце
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
              Переключайтесь между вкладками, чтобы быстро сравнить нашу
              планету и звезду, от которой зависит жизнь на Земле.
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/30">
            <div
              aria-label="Разделы"
              className="flex border-b border-white/10 bg-slate-900/80 p-2"
              role="tablist"
            >
              {tabs.map((tab) => {
                const isActive = tab.id === activeTab;

                return (
                  <button
                    aria-controls={`${tab.id}-panel`}
                    aria-selected={isActive}
                    className={`h-11 flex-1 rounded-md px-4 text-sm font-semibold transition-colors sm:flex-none sm:px-8 ${
                      isActive
                        ? "bg-cyan-300 text-slate-950"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                    id={`${tab.id}-tab`}
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    role="tab"
                    type="button"
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <article
              aria-labelledby={`${activeContent.id}-tab`}
              className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[320px_1fr] lg:p-10"
              id={`${activeContent.id}-panel`}
              role="tabpanel"
            >
              <div className="flex items-center justify-center">
                <div className="relative h-56 w-56 rounded-full bg-slate-900 p-5 shadow-[0_0_90px_rgba(34,211,238,0.22)]">
                  <div
                    aria-hidden="true"
                    className={`h-full w-full rounded-full ${activeContent.visualClass}`}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-semibold text-white">
                  {activeContent.title}
                </h2>
                <p className="mt-3 text-lg leading-8 text-slate-300">
                  {activeContent.subtitle}
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {activeContent.stats.map(([label, value]) => (
                    <div
                      className="rounded-md border border-white/10 bg-slate-900/70 p-4"
                      key={label}
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                        {label}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-white">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                <ul className="mt-7 space-y-3 text-base leading-7 text-slate-300">
                  {activeContent.facts.map((fact) => (
                    <li className="flex gap-3" key={fact}>
                      <span
                        aria-hidden="true"
                        className="mt-3 h-2 w-2 flex-none rounded-full bg-cyan-300"
                      />
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
