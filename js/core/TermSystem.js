/**
 * 术语系统 - 点击式词条解释
 */

class TermSystem {
    static instance = null;
    static terms = new Map();
    static currentTooltip = null;
    
    /**
     * 初始化术语系统
     */
    static initialize() {
        console.log('[TermSystem] 📚 初始化术语系统...');
        
        // 注册默认术语
        this.registerDefaultTerms();
        
        this.instance = this;
        console.log('[TermSystem] ✅ 术语系统初始化完成');
        return true;
    }
    
    /**
     * 注册默认术语
     */
    static registerDefaultTerms() {
        // 示例术语
        this.registerTerm('TA', '一个没有名字、没有记忆的存在。在黑暗中觉醒，开始探索自己与世界。');
        this.registerTerm('黑暗', '绝对的黑暗，没有任何光线。这是TA感知世界的起点。');
        this.registerTerm('空间', 'TA所处的狭小封闭区域，四面都是光滑冰冷的墙壁。');
    }
    
    /**
     * 注册术语
     */
    static registerTerm(term, description) {
        this.terms.set(term, description);
        console.log(`[TermSystem] 注册术语: ${term}`);
    }
    
    /**
     * 批量注册术语
     */
    static registerTerms(termsObject) {
        Object.keys(termsObject).forEach(term => {
            this.registerTerm(term, termsObject[term]);
        });
    }
    
    /**
     * 处理文本中的术语
     */
    static processText(text) {
        let processedText = text;
        
        // 按术语长度从长到短排序，避免短术语覆盖长术语
        const sortedTerms = Array.from(this.terms.keys()).sort((a, b) => b.length - a.length);
        
        sortedTerms.forEach(term => {
            // 转义正则表达式特殊字符
            const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(?<!<[^>]*)(${escapedTerm})(?![^<]*>)`, 'g');
            processedText = processedText.replace(regex, 
                `<span class="term-link" data-term="${term.replace(/"/g, '&quot;')}">$1</span>`
            );
        });
        
        return processedText;
    }
    
    /**
     * 显示术语提示框
     */
    static showTooltip(term, element) {
        const description = this.terms.get(term);
        if (!description) return;
        
        // 移除已存在的提示框
        this.hideTooltip();
        
        // 创建提示框
        const tooltip = document.createElement('div');
        tooltip.className = 'term-tooltip';
        tooltip.innerHTML = `
            <div class="term-tooltip-header">
                <span class="term-tooltip-title">${term}</span>
                <button class="term-tooltip-close">×</button>
            </div>
            <div class="term-tooltip-content">${description}</div>
        `;
        
        document.body.appendChild(tooltip);
        this.currentTooltip = tooltip;
        
        // 计算位置（在元素正下方）
        const rect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        let top = rect.bottom + 10;
        
        // 防止超出屏幕
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        if (top + tooltipRect.height > window.innerHeight - 10) {
            top = rect.top - tooltipRect.height - 10;
        }
        
        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
        
        // 淡入
        setTimeout(() => {
            tooltip.classList.add('visible');
        }, 10);
        
        // 关闭按钮事件
        const closeBtn = tooltip.querySelector('.term-tooltip-close');
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.hideTooltip();
        });
        
        // 点击提示框外部关闭
        setTimeout(() => {
            document.addEventListener('click', this.outsideClickHandler);
        }, 100);
        
        console.log(`[TermSystem] 显示术语: ${term}`);
    }
    
    /**
     * 隐藏提示框
     */
    static hideTooltip() {
        if (this.currentTooltip) {
            this.currentTooltip.classList.remove('visible');
            setTimeout(() => {
                if (this.currentTooltip && this.currentTooltip.parentNode) {
                    this.currentTooltip.parentNode.removeChild(this.currentTooltip);
                }
                this.currentTooltip = null;
            }, 300);
            
            document.removeEventListener('click', this.outsideClickHandler);
        }
    }
    
    /**
     * 外部点击处理
     */
    static outsideClickHandler = (e) => {
        if (this.currentTooltip && !this.currentTooltip.contains(e.target) && 
            !e.target.classList.contains('term-link')) {
            this.hideTooltip();
        }
    }
    
    /**
     * 为对话文本添加术语链接
     */
    static enhanceDialogueText(textElement) {
        const originalText = textElement.textContent || textElement.innerText;
        const processedHTML = this.processText(originalText);
        
        if (processedHTML !== originalText) {
            textElement.innerHTML = processedHTML;
            
            // 为术语链接添加点击事件
            const termLinks = textElement.querySelectorAll('.term-link');
            termLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    const term = link.getAttribute('data-term');
                    this.showTooltip(term, link);
                });
            });
        }
    }
}

// 添加到全局
window.TermSystem = TermSystem;

