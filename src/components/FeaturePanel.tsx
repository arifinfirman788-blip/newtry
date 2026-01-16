import React, { useState, useEffect } from 'react';
import { useFeature } from '../contexts/FeatureContext';
import { Edit2, Save, X, ChevronRight, ChevronDown, Layout, Palette, Type, Maximize, Box } from 'lucide-react';
import { UISpecs, FeatureSpec } from '../data/featureSpecs';

const FeaturePanel: React.FC = () => {
  const { currentFeatureId, getFeatureById, updateFeature, features, setCurrentFeatureId } = useFeature();
  const [isEditing, setIsEditing] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [editForm, setEditForm] = useState<{ 
    title: string; 
    description: string; 
    interactionLogic: string;
    uiSpecs?: UISpecs;
  }>({
    title: '',
    description: '',
    interactionLogic: ''
  });

  const currentFeature = currentFeatureId ? getFeatureById(currentFeatureId) : null;

  // Auto-expand parent when current feature changes
  useEffect(() => {
    if (currentFeatureId) {
      const parentId = findParentId(features, currentFeatureId);
      if (parentId) {
        setExpandedIds(prev => new Set([...prev, parentId]));
      } else {
        // If it's a root feature (like home), expand it to show children
        setExpandedIds(prev => new Set([...prev, currentFeatureId]));
      }
    }
  }, [currentFeatureId, features]);

  // Helper to find parent ID
  const findParentId = (list: typeof features, targetId: string): string | null => {
    for (const item of list) {
      if (item.subFeatures?.some(sub => sub.id === targetId)) {
        return item.id;
      }
      if (item.subFeatures) {
        const found = findParentId(item.subFeatures, targetId);
        if (found) return found;
      }
    }
    return null;
  };

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  useEffect(() => {
    if (currentFeature) {
      setEditForm({
        title: currentFeature.title,
        description: currentFeature.description,
        interactionLogic: currentFeature.interactionLogic,
        uiSpecs: currentFeature.uiSpecs
      });
      setIsEditing(false);
    }
  }, [currentFeatureId, currentFeature]);

  const handleSave = () => {
    if (currentFeatureId) {
      updateFeature(currentFeatureId, editForm);
      setIsEditing(false);
    }
  };

  const renderFeatureList = (list: typeof features, depth = 0) => {
    return (
      <div className="space-y-1">
        {list.map(f => {
          const isExpanded = expandedIds.has(f.id);
          const hasChildren = f.subFeatures && f.subFeatures.length > 0;
          
          return (
            <div key={f.id}>
              <div 
                className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                  currentFeatureId === f.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50 text-gray-700'
                }`}
                style={{ paddingLeft: `${depth * 12 + 12}px` }}
                onClick={() => setCurrentFeatureId(f.id)}
              >
                {hasChildren ? (
                  <div 
                    onClick={(e) => toggleExpand(f.id, e)}
                    className="p-0.5 hover:bg-gray-200 rounded transition-colors"
                  >
                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </div>
                ) : <div className="w-4.5" />}
                <span className="text-sm font-medium">{f.title}</span>
              </div>
              {hasChildren && isExpanded && renderFeatureList(f.subFeatures!, depth + 1)}
            </div>
          );
        })}
      </div>
    );
  };

  const renderUISpecs = (specs: UISpecs) => (
    <div className="grid grid-cols-2 gap-4">
      {specs.colors && (
        <div className="col-span-2 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <Palette size={12} /> 颜色
          </div>
          <div className="grid grid-cols-2 gap-2">
            {specs.colors.map((c, i) => (
              <div key={i} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
                <div 
                  className="w-6 h-6 rounded-md shadow-sm border border-gray-200" 
                  style={{ backgroundColor: c.value }}
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-medium text-gray-700 truncate">{c.name}</span>
                  <span className="text-[10px] text-gray-400 font-mono">{c.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {specs.typography && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <Type size={12} /> 字体
          </div>
          <div className="space-y-1">
            {specs.typography.map((t, i) => (
              <div key={i} className="flex justify-between items-center text-xs bg-gray-50 p-2 rounded border border-gray-100">
                <span className="text-gray-600">{t.name}</span>
                <span className="font-mono text-gray-400">{t.size} / {t.weight}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {specs.borderRadius && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <Maximize size={12} /> 圆角
          </div>
          <div className="space-y-1">
            {specs.borderRadius.map((r, i) => (
              <div key={i} className="flex justify-between items-center text-xs bg-gray-50 p-2 rounded border border-gray-100">
                <span className="text-gray-600">{r.name}</span>
                <span className="font-mono text-gray-400">{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

       {specs.shadows && (
        <div className="col-span-2 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <Box size={12} /> 阴影
          </div>
          <div className="space-y-1">
            {specs.shadows.map((s, i) => (
              <div key={i} className="flex flex-col text-xs bg-gray-50 p-2 rounded border border-gray-100 gap-1">
                <span className="text-gray-600 font-medium">{s.name}</span>
                <span className="font-mono text-gray-400 text-[10px] truncate" title={s.value}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-white border-l border-gray-200 shadow-xl w-[400px]">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div className="flex items-center gap-2 text-gray-800">
          <Layout size={18} />
          <h2 className="font-bold">功能说明书</h2>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Feature Tree (Top) */}
        <div className="h-1/3 overflow-y-auto border-b border-gray-100 p-2">
          <div className="text-xs font-bold text-gray-400 px-3 py-2 uppercase tracking-wider">功能列表</div>
          {renderFeatureList(features)}
        </div>

        {/* Detail View (Bottom) */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          {currentFeature ? (
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={e => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                    className="text-xl font-bold text-gray-900 border-b border-blue-500 focus:outline-none w-full pb-1"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-gray-900">{currentFeature.title}</h1>
                )}
                
                <button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className={`p-2 rounded-lg transition-colors ${
                    isEditing ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {isEditing ? <Save size={16} /> : <Edit2 size={16} />}
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">功能描述</h3>
                  {isEditing ? (
                    <textarea
                      value={editForm.description}
                      onChange={e => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full bg-white border border-gray-200 rounded-lg p-2 text-sm text-gray-700 h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    />
                  ) : (
                    <p className="text-sm text-gray-700 leading-relaxed">{currentFeature.description}</p>
                  )}
                </div>

                <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                  <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">交互逻辑</h3>
                  {isEditing ? (
                    <textarea
                      value={editForm.interactionLogic}
                      onChange={e => setEditForm(prev => ({ ...prev, interactionLogic: e.target.value }))}
                      className="w-full bg-white border border-gray-200 rounded-lg p-2 text-sm text-gray-700 h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    />
                  ) : (
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{currentFeature.interactionLogic}</p>
                  )}
                </div>

                {currentFeature.uiSpecs && (
                   <div className="border-t border-gray-100 pt-4">
                     <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                       <Layout size={16} /> UI 规范参数
                     </h3>
                     {renderUISpecs(currentFeature.uiSpecs)}
                   </div>
                )}

                {currentFeature.fields && (
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">字段定义</h3>
                    <div className="border border-gray-100 rounded-lg overflow-hidden">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-medium">
                          <tr>
                            <th className="px-4 py-2">字段名</th>
                            <th className="px-4 py-2">类型</th>
                            <th className="px-4 py-2">说明</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {currentFeature.fields.map((field, idx) => (
                            <tr key={idx} className="bg-white">
                              <td className="px-4 py-2 font-mono text-xs text-blue-600">{field.name}</td>
                              <td className="px-4 py-2 text-gray-500 text-xs">{field.type}</td>
                              <td className="px-4 py-2 text-gray-700">{field.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 flex-col gap-2">
              <Layout size={32} className="opacity-20" />
              <p className="text-sm">请从列表选择或点击左侧界面查看功能说明</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturePanel;
