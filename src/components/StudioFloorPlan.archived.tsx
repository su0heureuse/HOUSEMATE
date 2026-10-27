// 이전 홈 원룸 평면도 JSX 보관본. 현재 홈에서는 숨겼으며 복원할 수 있습니다.
//           {/* ==================== 1. 홈 "오늘" 화면: 원룸 평면도 ==================== */}
//           {activeTab === 'home' && (
//             <div className="flex flex-col" style={{ gap: 'var(--space-5)' }}>
//               <div className="flex items-end justify-between flex-wrap" style={{ gap: 'var(--space-3)' }}>
//                 <div>
//                   <p className="t-sub" style={{ margin: '0 0 4px 0' }}>{todayInfo.fullLabel} · 오늘 할 일 {homeSummaryCounts.totalTodo}개</p>
//                   <h1 className="t-title" style={{ margin: 0 }}>{todayInfo.greetingLine}</h1>
//                 </div>
//                 <Button variant="outline" onClick={handleStartDemoReceipt}>
//                   <Camera className="w-4 h-4" strokeWidth={1.5} /><span>영수증 스캔</span>
//                 </Button>
//               </div>
// 
//               <SectionCard title="우리집 평면도" subtitle="구역을 눌러 필요한 곳으로 바로 이동해요">
//                 <div className="relative" style={{
//                   padding: 'clamp(10px, 2.5vw, 20px)',
//                   borderRadius: 'var(--radius-card)',
//                   background: 'var(--bg-subtle)',
//                   border: '1px solid var(--border-hairline)'
//                 }}>
//                   <div className="flex items-center justify-between" style={{ margin: '0 2px 10px', gap: '8px' }}>
//                     <span className="t-caption flex items-center" style={{ gap: '6px' }}><Home className="w-4 h-4" />원룸 · 1인 생활 공간</span>
//                     <span className="t-caption">{todayInfo.month}월 {todayInfo.date}일</span>
//                   </div>
//                   <div className="grid" style={{
//                     height: 'clamp(390px, 45vw, 520px)',
//                     gridTemplateColumns: 'minmax(112px, 0.82fr) minmax(0, 1.6fr)',
//                     gridTemplateRows: '1.06fr 0.86fr 0.72fr',
//                     gap: '4px',
//                     padding: '4px',
//                     border: '3px solid var(--border-hairline)',
//                     borderRadius: '10px',
//                     background: 'var(--border-hairline)',
//                     overflow: 'hidden'
//                   }}>
//                     <button type="button" onClick={() => { setActiveTab('fridge'); setFridgeSubTab('ingredients'); }} className="flex flex-col text-left" style={{
//                       gridColumn: '1', gridRow: '1', minWidth: 0, padding: '12px', gap: '8px',
//                       border: '0', borderRadius: '6px 6px 0 0', background: 'var(--bg-card)', color: 'var(--text-primary)', cursor: 'pointer', textAlign: 'left'
//                     }}>
//                       <div className="flex items-center justify-between" style={{ gap: '6px' }}><Refrigerator className="w-5 h-5" style={{ color: 'var(--color-primary)' }} /><ChevronRight className="w-4 h-4" style={{ color: 'var(--text-disabled)' }} /></div>
//                       <span className="t-body-semibold">주방 · 냉장고</span>
//                       <span className="t-caption">임박 재료 {urgentFridgeItems.length}개</span>
//                       <div aria-hidden="true" className="mt-auto flex" style={{ gap: '3px', height: '20px' }}>
//                         <span style={{ flex: 1, borderRadius: '4px', background: 'var(--bg-subtle)' }} />
//                         <span style={{ flex: 1, borderRadius: '4px', background: 'var(--bg-subtle)' }} />
//                         <span style={{ flex: 1, borderRadius: '4px', background: 'var(--bg-subtle)' }} />
//                       </div>
//                     </button>
// 
//                     <button type="button" onClick={() => setActiveTab('chores')} className="flex flex-col text-left" style={{
//                       gridColumn: '1', gridRow: '2', minWidth: 0, padding: '12px', gap: '7px',
//                       border: '0', borderTop: '1px solid var(--border-hairline)', background: 'var(--bg-card)', color: 'var(--text-primary)', cursor: 'pointer', textAlign: 'left'
//                     }}>
//                       <div className="flex items-center justify-between" style={{ gap: '6px' }}><Recycle className="w-5 h-5" style={{ color: 'var(--color-primary)' }} /><ChevronRight className="w-4 h-4" style={{ color: 'var(--text-disabled)' }} /></div>
//                       <span className="t-body-semibold">욕실 · 분리수거</span>
//                       <span className="t-caption">{todayRecycleDone ? '오늘 배출 완료' : todayRecycleList.length ? `오늘 ${todayRecycleList.length}종 배출` : '오늘 배출 없음'}</span>
//                     </button>
// 
//                     <button type="button" onClick={() => setActiveTab('bills')} className="flex items-center text-left" style={{
//                       gridColumn: '1', gridRow: '3', minWidth: 0, padding: '10px 12px', gap: '8px',
//                       border: '0', borderTop: '1px solid var(--border-hairline)', borderRadius: '0 0 0 6px', background: 'var(--bg-card)', color: 'var(--text-primary)', cursor: 'pointer', textAlign: 'left'
//                     }}>
//                       <Receipt className="w-5 h-5 shrink-0" style={{ color: 'var(--text-secondary)' }} />
//                       <span className="flex flex-col" style={{ minWidth: 0 }}><span className="t-body-semibold">현관 · 고정비</span><span className="t-caption truncate">{unpaidBills.length ? `미납 ${unpaidBills.length}건` : '모두 납부했어요'}</span></span>
//                     </button>
// 
//                     <button type="button" onClick={() => {
//                       if (heroTask.type === 'bill') setActiveTab('bills');
//                       else if (heroTask.type === 'fridge') { setActiveTab('fridge'); setFridgeSubTab('ingredients'); }
//                       else if (heroTask.type === 'recycle') setActiveTab('chores');
//                       else handleStartDemoReceipt();
//                     }} className="relative flex flex-col text-left" style={{
//                       gridColumn: '2', gridRow: '1 / span 3', minWidth: 0, padding: 'clamp(12px, 3vw, 24px)', gap: '12px',
//                       border: '0', borderRadius: '0 6px 6px 0', background: 'var(--bg-card)', color: 'var(--text-primary)', cursor: 'pointer', textAlign: 'left', overflow: 'hidden'
//                     }}>
//                       <div className="flex items-center justify-between" style={{ gap: '8px' }}>
//                         <span className="t-caption">거실 · 오늘의 할 일</span>
//                         <StatusChip variant={heroTask.statusVariant}>{heroTask.statusLabel}</StatusChip>
//                       </div>
//                       <div className="flex-1 flex flex-col justify-center" style={{ minHeight: 0, gap: '12px' }}>
//                         <div className="flex items-end justify-between" style={{ gap: '8px' }}>
//                           <div className="flex flex-col" style={{ gap: '5px', minWidth: 0 }}>
//                             <span className="t-card-title">{heroTask.title}</span>
//                             <span className="t-sub">{heroTask.sub}</span>
//                           </div>
//                           <span className="t-body-semibold tabular-nums shrink-0" style={{ color: heroTask.statusVariant === 'urgent' ? 'var(--color-status-urgent)' : 'var(--color-primary)' }}>{heroTask.metric}</span>
//                         </div>
//                         <div aria-hidden="true" className="relative flex items-center justify-center" style={{ minHeight: '155px', flex: 1, borderRadius: '10px', background: 'var(--bg-subtle)', border: '1px solid var(--border-hairline)' }}>
//                           <div className="absolute" style={{ top: '12%', left: '8%', width: '36%', height: '29%', borderRadius: '7px', border: '2px solid var(--border-hairline)', background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}><BedDouble className="w-7 h-7" strokeWidth={1.3} /></div>
//                           <div className="absolute" style={{ top: '12%', right: '8%', width: '18%', height: '29%', borderRadius: '5px', border: '2px solid var(--border-hairline)', background: 'var(--bg-card)' }} />
//                           <div className="absolute flex items-center justify-center" style={{ bottom: '12%', left: '34%', width: '34%', height: '21%', borderRadius: '7px', border: '2px solid var(--border-hairline)', background: 'var(--bg-card)', color: 'var(--text-secondary)' }}><Utensils className="w-5 h-5" strokeWidth={1.4} /></div>
//                           <span className="absolute t-caption" style={{ bottom: '4%', right: '7%' }}>침대 · 테이블</span>
//                         </div>
//                       </div>
//                       <span className="ui-btn ui-btn-primary w-full justify-center" style={{ pointerEvents: 'none' }}><Check className="w-4 h-4" />{heroTask.ctaLabel}</span>
//                     </button>
//                   </div>
//                   <div className="flex items-center justify-between t-caption" style={{ padding: '9px 2px 0', gap: '8px' }}>
//                     <span>장보기 {shoppingStats.remaining}개</span>
//                     <button type="button" className="bg-transparent border-0 cursor-pointer t-caption" style={{ color: 'var(--text-secondary)', padding: '4px' }} onClick={() => { setActiveTab('fridge'); setFridgeSubTab('shopping'); }}>장보기 보기 →</button>
//                   </div>
//                 </div>
//               </SectionCard>
// 
//               <RescueRecipeSection
//                 fridgeItems={fridgeItems}
//                 today={todayInfo.todayYMD}
//                 previewOnly
//                 onCook={handleCookWithRescueRecipe}
//                 onAddShoppingItem={handleAddRecipeShoppingItem}
//                 onReceipt={() => cameraInputRef.current?.click()}
//                 onStats={() => { setActiveTab('fridge'); setFridgeSubTab('stats'); }}
//                 showToast={showToast}
//                 copyToClipboard={copyToClipboard}
//               />
//             </div>
//           )}
// 
export {};
