import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Upload, Clock, Settings } from 'lucide-react';
import Editor from '@monaco-editor/react';
import './ProblemView.css';

const DEFAULT_CODE = `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
};`;

export default function ProblemView() {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(DEFAULT_CODE);
  const [activeTab, setActiveTab] = useState<'testcases' | 'result'>('testcases');
  const [activeCase, setActiveCase] = useState(1);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleRun = () => {
    setActiveTab('result');
  };

  return (
    <div className="problem-view-container">
      <div className="problem-header">
        <div className="nav-buttons">
          <button className="btn-icon"><ChevronLeft size={20} /></button>
          <button className="btn-icon"><ChevronRight size={20} /></button>
        </div>
        
        <div className="timer-display">
          <Clock size={18} />
          {formatTime(time)}
        </div>

        <div className="action-buttons">
          <button className="btn-run" onClick={handleRun}>
            <Play size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }}/>
            Run
          </button>
          <button className="btn-submit">
            <Upload size={16} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }}/>
            Submit
          </button>
        </div>
      </div>

      <div className="split-pane">
        <div className="problem-description-pane">
          <div className="prob-title-row">
            <h1>1. Two Sum</h1>
            <span className="diff-badge diff-easy" style={{ fontSize: '0.85rem' }}>Easy</span>
          </div>

          <div className="prob-content">
            <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>
            <p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>
            <p>You can return the answer in any order.</p>

            <br />
            <strong>Example 1:</strong>
            <pre>
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
            </pre>

            <strong>Example 2:</strong>
            <pre>
Input: nums = [3,2,4], target = 6
Output: [1,2]
            </pre>

            <strong>Example 3:</strong>
            <pre>
Input: nums = [3,3], target = 6
Output: [0,1]
            </pre>

            <br />
            <strong>Constraints:</strong>
            <ul>
              <li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
              <li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
              <li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>
              <li><strong>Only one valid answer exists.</strong></li>
            </ul>
          </div>
        </div>

        <div className="editor-pane">
          <div className="editor-toolbar">
            <select 
              className="lang-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python 3</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
            <button className="btn-icon"><Settings size={18} /></button>
          </div>
          
          <div className="editor-container">
            <Editor
              height="100%"
              language={language}
              theme="vs-dark"
              value={code}
              onChange={(val) => setCode(val || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "'Fira Code', monospace",
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                cursorBlinking: "smooth",
                padding: { top: 16 }
              }}
            />
          </div>

          <div className="test-cases-panel">
            <div className="test-tabs">
              <button 
                className={`test-tab ${activeTab === 'testcases' ? 'active' : ''}`}
                onClick={() => setActiveTab('testcases')}
              >
                Test Cases
              </button>
              <button 
                className={`test-tab ${activeTab === 'result' ? 'active' : ''}`}
                onClick={() => setActiveTab('result')}
              >
                Test Result
              </button>
            </div>
            
            <div className="test-content">
              {activeTab === 'testcases' && (
                <>
                  <div className="case-buttons">
                    {[1, 2, 3].map(num => (
                      <button 
                        key={num}
                        className={`case-btn ${activeCase === num ? 'active' : ''}`}
                        onClick={() => setActiveCase(num)}
                      >
                        Case {num}
                      </button>
                    ))}
                  </div>
                  
                  <div className="case-io">
                    <div className="io-block">
                      <span className="io-label">nums =</span>
                      <div className="io-value">
                        {activeCase === 1 ? '[2,7,11,15]' : activeCase === 2 ? '[3,2,4]' : '[3,3]'}
                      </div>
                    </div>
                    <div className="io-block">
                      <span className="io-label">target =</span>
                      <div className="io-value">
                        {activeCase === 1 ? '9' : activeCase === 2 ? '6' : '6'}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'result' && (
                <div style={{ color: 'var(--accent-emerald)', fontSize: '1.2rem', fontWeight: 600, padding: '1rem 0' }}>
                  Accepted
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 'normal', marginTop: '0.5rem' }}>
                    Runtime: 56 ms<br />
                    Memory: 42.3 MB
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
